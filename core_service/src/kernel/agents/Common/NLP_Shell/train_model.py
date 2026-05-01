import pandas as pd
import pickle

from sentence_transformers import SentenceTransformer
from sklearn.model_selection import train_test_split
from sklearn.neighbors import NearestNeighbors

def preprocess(text):
    return text.lower().strip()

df = pd.read_csv("clean_dataset.csv")

texts = [preprocess(t) for t in df["text"].tolist()]
commands = df["command"].tolist()

X_train_text, X_test_text, y_train, y_test = train_test_split(
    texts, commands, test_size=0.2, random_state=42
)

print("Loading embedding model...")
model = SentenceTransformer("all-mpnet-base-v2")

print("Generating embeddings...")
X_train = model.encode(X_train_text)
X_test = model.encode(X_test_text)

print("Training nearest neighbor index...")
nn = NearestNeighbors(n_neighbors=3, metric="cosine")
nn.fit(X_train)

print("Evaluating intent accuracy...")

correct = 0

for i, vec in enumerate(X_test):

    dist, idx = nn.kneighbors([vec])

    preds = [y_train[j] for j in idx[0]]

    true_intent = y_test[i].split()[0]

    for p in preds:
        if p.split()[0] == true_intent:
            correct += 1
            break

accuracy = correct / len(X_test)

print("\nIntent Accuracy:", accuracy)

with open("nlp_cli_model.pkl", "wb") as f:
    pickle.dump((model, nn, X_train, y_train), f)

print("\nModel saved as nlp_cli_model.pkl")

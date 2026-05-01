import pickle

with open("nlp_cli_model.pkl", "rb") as f:
    embedder, nn, X_train, commands = pickle.load(f)


def preprocess(text):
    return text.lower().strip()


def rule_engine(query):

    q = query.lower()

    if "list" in q or "show files" in q:
        return "ls"

    if "search" in q or "find word" in q or "grep" in q:
        return "grep <pattern> <file>"

    if "disk usage" in q:
        return "du -h"

    if "process" in q:
        return "ps"

    if "permissions" in q or "chmod" in q:
        return "chmod 755 <file>"

    return None


def embedding_predict(query):

    vec = embedder.encode([preprocess(query)])

    dist, idx = nn.kneighbors(vec)

    return commands[idx[0][0]]


def predict(query):

    rule = rule_engine(query)

    if rule:
        return rule

    return embedding_predict(query)


while True:

    query = input("\nEnter command request: ")

    print("Predicted command:", predict(query))

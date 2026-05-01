import { useParams } from 'react-router-dom';
import DocContent from './DocContent';
import { docCategories } from './docData';

export default function DocsPage() {
  const { categoryId, articleId } = useParams();

  const category = docCategories.find(cat => cat.id === categoryId);

  if (!category) {
    return <div className="text-white p-10">Category not found</div>;
  }

  return <DocContent category={category} articleId={articleId} />;
}
import LetterDetailPage from "../../LetterDetailPage";
import { getCategoryBySuffix } from "../../portfolioContent";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TypographyDetailPage({ params }: Props) {
  const { id } = await params;
  return <LetterDetailPage category={getCategoryBySuffix("t")!} projectId={id} />;
}

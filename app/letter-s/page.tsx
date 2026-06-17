import LetterIndexPage from "../LetterIndexPage";
import { getCategoryBySuffix } from "../portfolioContent";

export default function StudioItselfListPage() {
  return <LetterIndexPage category={getCategoryBySuffix("s")!} />;
}

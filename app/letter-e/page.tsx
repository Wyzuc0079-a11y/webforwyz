import LetterIndexPage from "../LetterIndexPage";
import { getCategoryBySuffix } from "../portfolioContent";

export default function EventListPage() {
  return <LetterIndexPage category={getCategoryBySuffix("e")!} />;
}

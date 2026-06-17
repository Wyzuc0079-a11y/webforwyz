import LetterIndexPage from "../LetterIndexPage";
import { getCategoryBySuffix } from "../portfolioContent";

export default function OthersListPage() {
  return <LetterIndexPage category={getCategoryBySuffix("o")!} />;
}

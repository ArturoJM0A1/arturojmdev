import CommentSection from "../CommentSection.jsx";
import PageIntro from "../components/PageIntro.jsx";

export default function CommentsPage() {
  return (
    <div className="page-stack">
      <div className="comments-wrapper">
        <CommentSection />
      </div>
    </div>
  );
}

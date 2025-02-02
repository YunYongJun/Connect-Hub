import express from "express";
import { postWriteController, postViewController, getPostDetailController, deletePostController, postCommentController, getCommentsByPostController, postUpdateController, reportPostController, reportCommentController, searchPostController} from "../controller/postController";

const postRouter = express.Router();

postRouter.route("/write").post(postWriteController);// 게시글 작성 기능
postRouter.get("/", postViewController); // 게시글 조회 기능
postRouter.delete("/", deletePostController); // 게시글 삭제 기능
postRouter.get("/search", searchPostController); // 게시글 검색 기능
postRouter.get("/:id", getPostDetailController); // 게시글 상세 조회 기능
postRouter.put("/update/:id", postUpdateController);  // 게시글 변경 기능
postRouter.get("/:id/comment", getCommentsByPostController); // 게시글 댓글 조회 기능
postRouter.post("/comment", postCommentController); // 댓글 작성 기능
postRouter.post('/report', reportPostController); // 게시글 신고 기능
postRouter.post("/:id/comment/report", reportCommentController); // 댓글 신고 기능

export default postRouter;

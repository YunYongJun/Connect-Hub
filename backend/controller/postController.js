import Post from "../model/Post";
import Comment from "../model/Comment";
import logger from "../config/logger";

export const postWriteController = async (req, res) => {
    const { userId, categoryId, title, content } = req.body;
    try {
        const result = await Post.insertPost(userId, categoryId, title, content);
        res.status(200).json(result);
        logger.info(`게시글 생성 성공: ${title}`);
    } catch (err) {
        res.status(500).send('게시글 생성 중 오류 발생: ' + err.message);
        logger.error(`게시글 생성 중 오류 발생: ${err.message}`);
    }
};

export const postViewController = async (req, res) => {
    const { categoryId, limit } = req.query;
    try {
        const posts = categoryId 
            ? await Post.getPostByCategoryId(categoryId, limit) 
            : await Post.getAllPosts(limit);
        
        res.status(200).json(posts);
        logger.info('게시글 조회 성공');
    } catch (err) {
        res.status(500).send('게시글 조회 중 오류 발생: ' + err.message);
        logger.error(`게시글 조회 중 오류 발생: ${err.message}`);
    }
};

export const getPostDetailController = async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await Post.getPostDetail(postId);
        if (post) {
            res.status(200).json(post);
            logger.info(`게시글 상세 조회 성공: ${postId}`);
        } else {
            res.status(404).send('해당하는 게시글을 찾을 수 없습니다.');
            logger.warn(`게시글을 찾을 수 없음: ${postId}`);
        }
    } catch (err) {
        res.status(500).send('게시글 조회 중 오류 발생: ' + err.message);
        logger.error(`게시글 조회 중 오류 발생: ${err.message}`);
    }
};

// 댓글 작성 컨트롤러
export const postCommentController = async (req, res) => {
    const { postId, userId, content } = req.body;
    try {
        const result = await Comment.insertComment(postId, userId, content);
        res.status(200).json(result);
        logger.info(`댓글 생성 성공: ${content}`);
    } catch (err) {
        res.status(500).send('댓글 생성 중 오류 발생: ' + err.message);
        logger.error(`댓글 생성 중 오류 발생: ${err.message}`);
    }
};

// 댓글 조회 컨트롤러
export const getCommentsByPostController = async (req, res) => {
    const postId = req.params.id;
    try {
        const comments = await Comment.getCommentsByPostId(postId);
        res.status(200).json(comments);
        logger.info(`댓글 조회 성공: ${postId}`);
    } catch (err) {
        res.status(500).send('댓글 조회 중 오류 발생: ' + err.message);
        logger.error(`댓글 조회 중 오류 발생: ${err.message}`);
    }
};
import User from './user.js';
import Post from './post.js';
import Comment from './comment.js';
import Category from './category.js';

// Relations User-Post
User.hasMany(Post, {
  foreignKey: 'userId',
  as: 'posts'
});
Post.belongsTo(User, {
  foreignKey: 'userId',
  as: 'author'
});

// Relations User-Comment
User.hasMany(Comment, {
  foreignKey: 'userId',
  as: 'comments'
});
Comment.belongsTo(User, {
  foreignKey: 'userId',
  as: 'author'
});

// Relations Category-Post
Category.hasMany(Post, {
  foreignKey: 'categoryId',
  as: 'posts'
});
Post.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category'
});

// Relations Post-Comment
Post.hasMany(Comment, {
  foreignKey: 'postId',
  as: 'comments'
});
Comment.belongsTo(Post, {
  foreignKey: 'postId',
  as: 'post'
});

// Relations Comment-Comment (réponses)
Comment.hasMany(Comment, {
  foreignKey: 'parentId',
  as: 'replies'
});
Comment.belongsTo(Comment, {
  foreignKey: 'parentId',
  as: 'parent'
});

// Export all models
export { User, Post, Comment, Category };
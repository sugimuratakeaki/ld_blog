import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/templates';
import { Button, Input, Select, Textarea, Badge } from '@/components/atoms';
import { Card, CardHeader, CardBody, Alert } from '@/components/molecules';
import { getCategories, getTags } from '@/data/mockData';
import type { Category } from '@/types';

interface ArticleFormData {
  title: string;
  content: string;
  categoryId: string;
  tags: string[];
  status: 'draft' | 'published' | 'scheduled' | 'private';
  scheduledDate: string;
}

export const ArticleEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = !id;

  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    content: '',
    categoryId: '',
    tags: [],
    status: 'draft',
    scheduledDate: '',
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [popularTags, setPopularTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    // Load categories and tags
    setCategories(getCategories());
    setPopularTags(getTags());

    // If editing, load article data
    if (!isNew) {
      // In a real app, fetch article data here
      setFormData({
        title: 'サンプル記事タイトル',
        content: 'これはサンプルの記事内容です。\n\n実際のアプリケーションでは、APIから記事データを取得します。',
        categoryId: '1',
        tags: ['React', 'TypeScript'],
        status: 'published',
        scheduledDate: '',
      });
      setTagInput('React, TypeScript');
    }
  }, [isNew]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagAdd = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !formData.tags.includes(trimmedTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, trimmedTag],
      }));
      const currentTags = tagInput.split(',').map(t => t.trim()).filter(t => t);
      if (!currentTags.includes(trimmedTag)) {
        currentTags.push(trimmedTag);
        setTagInput(currentTags.join(', '));
      }
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
    const currentTags = tagInput.split(',').map(t => t.trim()).filter(t => t && t !== tagToRemove);
    setTagInput(currentTags.join(', '));
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleTagInputBlur = () => {
    const tags = tagInput.split(',').map(t => t.trim()).filter(t => t);
    setFormData(prev => ({
      ...prev,
      tags,
    }));
  };

  const handleToolbarClick = (action: string) => {
    // Implement toolbar actions
    console.log('Toolbar action:', action);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, submit to API
    console.log('Submitting:', formData);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate('/articles');
    }, 2000);
  };

  const handlePreview = () => {
    setShowPreview(!showPreview);
  };

  const statusOptions = [
    { value: 'draft', label: '下書き' },
    { value: 'published', label: '公開' },
    { value: 'scheduled', label: '予約投稿' },
    { value: 'private', label: '非公開' },
  ];

  const categoryOptions = [
    { value: '', label: 'カテゴリを選択' },
    ...categories.map(cat => ({
      value: cat.id.toString(),
      label: `${cat.name} (${cat.count})`,
    })),
  ];

  return (
    <Layout>
      <div className="page-header">
        <h1 className="page-title">
          {isNew ? '新規記事作成' : '記事編集'}
        </h1>
        <p className="page-description">
          {isNew ? '新しい記事を作成します' : '既存の記事を編集します'}
        </p>
      </div>

      {showSuccess && (
        <Alert
          type="success"
          title="保存しました"
          message="記事が正常に保存されました。記事一覧に戻ります..."
          dismissible
          onDismiss={() => setShowSuccess(false)}
        />
      )}

      <form onSubmit={handleSubmit} className="editor-container">
        <div className="editor-main">
          {/* Title Input */}
          <Input
            type="text"
            name="title"
            placeholder="記事タイトルを入力..."
            value={formData.title}
            onChange={handleInputChange}
            required
            fullWidth
            className="form-input-lg"
          />

          {/* Editor Toolbar */}
          <div className="editor-toolbar">
            <div className="toolbar-group">
              <button
                type="button"
                className="toolbar-btn"
                title="太字"
                onClick={() => handleToolbarClick('bold')}
              >
                <strong>B</strong>
              </button>
              <button
                type="button"
                className="toolbar-btn"
                title="斜体"
                onClick={() => handleToolbarClick('italic')}
              >
                <em>I</em>
              </button>
              <button
                type="button"
                className="toolbar-btn"
                title="下線"
                onClick={() => handleToolbarClick('underline')}
              >
                <u>U</u>
              </button>
              <button
                type="button"
                className="toolbar-btn"
                title="取り消し線"
                onClick={() => handleToolbarClick('strike')}
              >
                <s>S</s>
              </button>
            </div>

            <div className="toolbar-divider" />

            <div className="toolbar-group">
              <button
                type="button"
                className="toolbar-btn"
                title="見出し1"
                onClick={() => handleToolbarClick('h1')}
              >
                H1
              </button>
              <button
                type="button"
                className="toolbar-btn"
                title="見出し2"
                onClick={() => handleToolbarClick('h2')}
              >
                H2
              </button>
              <button
                type="button"
                className="toolbar-btn"
                title="見出し3"
                onClick={() => handleToolbarClick('h3')}
              >
                H3
              </button>
            </div>

            <div className="toolbar-divider" />

            <div className="toolbar-group">
              <button
                type="button"
                className="toolbar-btn"
                title="リスト"
                onClick={() => handleToolbarClick('list')}
              >
                ☰
              </button>
              <button
                type="button"
                className="toolbar-btn"
                title="番号付きリスト"
                onClick={() => handleToolbarClick('numbered-list')}
              >
                ≡
              </button>
              <button
                type="button"
                className="toolbar-btn"
                title="引用"
                onClick={() => handleToolbarClick('quote')}
              >
                ❝
              </button>
            </div>

            <div className="toolbar-divider" />

            <div className="toolbar-group">
              <button
                type="button"
                className="toolbar-btn"
                title="リンク"
                onClick={() => handleToolbarClick('link')}
              >
                🔗
              </button>
              <button
                type="button"
                className="toolbar-btn"
                title="画像"
                onClick={() => handleToolbarClick('image')}
              >
                🖼
              </button>
              <button
                type="button"
                className="toolbar-btn"
                title="動画"
                onClick={() => handleToolbarClick('video')}
              >
                🎥
              </button>
            </div>
          </div>

          {/* Content Editor */}
          <Textarea
            name="content"
            rows={20}
            placeholder="記事の内容を入力..."
            value={formData.content}
            onChange={handleInputChange}
            className="editor-content"
            fullWidth
          />
        </div>

        {/* Sidebar */}
        <div className="editor-sidebar">
          {/* Category Selection */}
          <Card>
            <CardHeader>
              <h3>カテゴリ</h3>
            </CardHeader>
            <CardBody>
              <Select
                name="categoryId"
                options={categoryOptions}
                value={formData.categoryId}
                onChange={handleInputChange}
                fullWidth
              />
            </CardBody>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <h3>タグ</h3>
            </CardHeader>
            <CardBody>
              <Input
                type="text"
                placeholder="タグを入力（カンマ区切り）"
                value={tagInput}
                onChange={handleTagInputChange}
                onBlur={handleTagInputBlur}
                fullWidth
              />
              <div className="tag-suggestions">
                <small>人気のタグ:</small>
                <div className="tag-list">
                  {popularTags.slice(0, 6).map(tag => (
                    <span
                      key={tag}
                      className="tag-chip"
                      onClick={() => handleTagAdd(tag)}
                      role="button"
                      tabIndex={0}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {formData.tags.length > 0 && (
                <div className="selected-tags">
                  <small>選択中のタグ:</small>
                  <div className="tag-list">
                    {formData.tags.map(tag => (
                      <Badge
                        key={tag}
                        variant="primary"
                        className="tag-badge"
                      >
                        {tag}
                        <button
                          type="button"
                          className="tag-remove"
                          onClick={() => handleTagRemove(tag)}
                          aria-label={`${tag}を削除`}
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardBody>
          </Card>

          {/* Publish Settings */}
          <Card>
            <CardHeader>
              <h3>公開設定</h3>
            </CardHeader>
            <CardBody>
              <Select
                name="status"
                label="ステータス"
                options={statusOptions}
                value={formData.status}
                onChange={handleInputChange}
                fullWidth
              />
              {formData.status === 'scheduled' && (
                <Input
                  type="datetime-local"
                  name="scheduledDate"
                  label="予約日時"
                  value={formData.scheduledDate}
                  onChange={handleInputChange}
                  fullWidth
                />
              )}
            </CardBody>
          </Card>

          {/* Action Buttons */}
          <div className="sidebar-actions">
            <Button
              type="button"
              variant="secondary"
              fullWidth
              onClick={handlePreview}
            >
              プレビュー
            </Button>
            <Button type="submit" variant="primary" fullWidth>
              {isNew ? '記事を投稿' : '変更を保存'}
            </Button>
          </div>
        </div>
      </form>

      {/* Preview Modal (simple implementation) */}
      {showPreview && (
        <div className="preview-overlay" onClick={() => setShowPreview(false)}>
          <div className="preview-content" onClick={e => e.stopPropagation()}>
            <div className="preview-header">
              <h2>プレビュー</h2>
              <button
                type="button"
                className="preview-close"
                onClick={() => setShowPreview(false)}
              >
                ×
              </button>
            </div>
            <div className="preview-body">
              <h1>{formData.title || '（タイトル未入力）'}</h1>
              <div className="preview-meta">
                <span>カテゴリ: {categories.find(c => c.id.toString() === formData.categoryId)?.name || '未選択'}</span>
                <span>タグ: {formData.tags.join(', ') || 'なし'}</span>
              </div>
              <div className="preview-text">
                {formData.content.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph || <br />}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};
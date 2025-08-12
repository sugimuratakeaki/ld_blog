import React, { useState, useEffect, useRef } from 'react';
import { Layout } from '@/components/templates';
import { Button, Input, Select, Checkbox } from '@/components/atoms';
import { Card, Alert, Modal, Dropdown } from '@/components/molecules';
import { getImages, getFolders } from '@/data/mockData';
import type { Image, Folder } from '@/types';

type ViewMode = 'grid' | 'list';

export const ImageManager: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedImages, setSelectedImages] = useState<Set<number>>(new Set());
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load images and folders
    setImages(getImages());
    setFolders(getFolders());
  }, []);

  const filteredImages = images.filter(image => {
    const matchesSearch = image.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFolder = selectedFolder === 'all' || image.folder === folders.find(f => f.id.toString() === selectedFolder)?.name;
    return matchesSearch && matchesFolder;
  });

  const totalSize = '256 MB';
  const totalCount = images.length;
  const storagePercentage = 25;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedImages(new Set(filteredImages.map(img => img.id)));
    } else {
      setSelectedImages(new Set());
    }
  };

  const handleSelectImage = (imageId: number) => {
    const newSelected = new Set(selectedImages);
    if (newSelected.has(imageId)) {
      newSelected.delete(imageId);
    } else {
      newSelected.add(imageId);
    }
    setSelectedImages(newSelected);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    // In a real app, upload files to server
    console.log('Uploading files:', files);
    setSuccessMessage(`${files.length}個のファイルをアップロードしました`);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDelete = () => {
    // In a real app, delete selected images
    console.log('Deleting images:', Array.from(selectedImages));
    setShowDeleteModal(false);
    setSuccessMessage(`${selectedImages.size}個の画像を削除しました`);
    setShowSuccess(true);
    setSelectedImages(new Set());
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCopyUrl = (imageUrl: string) => {
    navigator.clipboard.writeText(imageUrl);
    setSuccessMessage('URLをコピーしました');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const folderOptions = [
    { value: 'all', label: 'すべて' },
    ...folders.map(folder => ({
      value: folder.id.toString(),
      label: `${folder.name} (${folder.count})`,
    })),
  ];

  const dropdownItems = [
    { id: 'move', label: 'フォルダに移動', icon: '📁' },
    { id: 'rename', label: '名前を変更', icon: '✏️' },
    { id: 'divider', divider: true, label: '' },
    { id: 'delete', label: '削除', icon: '🗑️' },
  ];

  return (
    <Layout>
      <div className="page-header">
        <h1 className="page-title">画像管理</h1>
        <p className="page-description">ブログで使用する画像を管理します</p>
      </div>

      {showSuccess && (
        <Alert
          type="success"
          message={successMessage}
          dismissible
          onDismiss={() => setShowSuccess(false)}
        />
      )}

      {/* Storage Info */}
      <Card className="storage-info">
        <CardBody>
          <div className="storage-stats">
            <span>使用容量: <strong>{totalSize}</strong> / 1GB</span>
            <span>画像数: <strong>{totalCount}</strong>枚</span>
          </div>
          <div className="storage-bar">
            <div className="storage-bar-fill" style={{ width: `${storagePercentage}%` }} />
          </div>
        </CardBody>
      </Card>

      {/* Upload Area */}
      <div
        className={`upload-area ${dragActive ? 'upload-area-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="upload-dropzone">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M24 8v24m-12-12h24" strokeLinecap="round" />
          </svg>
          <p>画像をドラッグ＆ドロップ</p>
          <p className="upload-hint">または</p>
          <Button
            variant="primary"
            onClick={() => fileInputRef.current?.click()}
          >
            ファイルを選択
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileInput}
          />
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="filters-section">
        <div className="filters-row">
          <Select
            options={folderOptions}
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
            label="フォルダ"
          />
          
          <Input
            type="text"
            placeholder="ファイル名で検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            label="検索"
            fullWidth
          />
          
          <div className="filter-group">
            <label className="filter-label">表示</label>
            <div className="btn-group">
              <Button
                size="sm"
                variant={viewMode === 'grid' ? 'primary' : 'outline'}
                onClick={() => setViewMode('grid')}
              >
                グリッド
              </Button>
              <Button
                size="sm"
                variant={viewMode === 'list' ? 'primary' : 'outline'}
                onClick={() => setViewMode('list')}
              >
                リスト
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Grid/List */}
      <div className="images-container">
        {viewMode === 'grid' ? (
          <div className="image-grid">
            {filteredImages.map(image => (
              <div key={image.id} className="image-card">
                <div className="image-card-preview">
                  <img src={image.url} alt={image.name} />
                  <div className="image-card-overlay">
                    <Button
                      size="sm"
                      variant="white"
                      onClick={() => handleSelectImage(image.id)}
                    >
                      {selectedImages.has(image.id) ? '選択解除' : '選択'}
                    </Button>
                    <Button
                      size="sm"
                      variant="white"
                      onClick={() => handleCopyUrl(image.url)}
                    >
                      URL
                    </Button>
                  </div>
                </div>
                <div className="image-card-info">
                  <div className="image-name" title={image.name}>{image.name}</div>
                  <div className="image-meta">
                    <span>{image.size}</span>
                    <span>{image.dimensions}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}>
                    <Checkbox
                      checked={selectedImages.size === filteredImages.length && filteredImages.length > 0}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </th>
                  <th style={{ width: '80px' }}>プレビュー</th>
                  <th>ファイル名</th>
                  <th style={{ width: '120px' }}>フォルダ</th>
                  <th style={{ width: '100px' }}>サイズ</th>
                  <th style={{ width: '120px' }}>サイズ（px）</th>
                  <th style={{ width: '120px' }}>アップロード日</th>
                  <th style={{ width: '100px' }}>操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredImages.map(image => (
                  <tr key={image.id}>
                    <td>
                      <Checkbox
                        checked={selectedImages.has(image.id)}
                        onChange={() => handleSelectImage(image.id)}
                      />
                    </td>
                    <td>
                      <img 
                        src={image.url} 
                        alt={image.name} 
                        className="table-thumbnail"
                      />
                    </td>
                    <td>{image.name}</td>
                    <td>{image.folder}</td>
                    <td>{image.size}</td>
                    <td>{image.dimensions}</td>
                    <td>{image.uploadedDate}</td>
                    <td>
                      <div className="table-actions">
                        <Button
                          size="sm"
                          variant="icon"
                          title="URLをコピー"
                          onClick={() => handleCopyUrl(image.url)}
                        >
                          📋
                        </Button>
                        <Dropdown
                          trigger={
                            <Button size="sm" variant="icon" title="その他">
                              ⋯
                            </Button>
                          }
                          items={dropdownItems}
                          onSelect={(item) => {
                            if (item.id === 'delete') {
                              handleSelectImage(image.id);
                              setShowDeleteModal(true);
                            }
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Selected Actions Bar */}
      {selectedImages.size > 0 && (
        <div className="selected-actions">
          <div className="selected-info">
            <span className="selected-count">{selectedImages.size}個選択中</span>
          </div>
          <div className="selected-buttons">
            <Button size="sm" variant="secondary">
              フォルダに移動
            </Button>
            <Button 
              size="sm" 
              variant="danger"
              onClick={() => setShowDeleteModal(true)}
            >
              削除
            </Button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="削除の確認"
        size="sm"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              キャンセル
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
            >
              削除する
            </Button>
          </>
        }
      >
        <p>{selectedImages.size}個の画像を削除しますか？</p>
        <p className="text-muted">この操作は取り消せません。</p>
      </Modal>
    </Layout>
  );
};
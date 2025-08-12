import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from '@/pages/Dashboard';
import { Articles } from '@/pages/Articles';
import { ArticleEdit } from '@/pages/ArticleEdit';
import { ImageManager } from '@/pages/ImageManager';
import './styles/main.scss';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/new" element={<ArticleEdit />} />
        <Route path="/articles/edit/:id" element={<ArticleEdit />} />
        <Route path="/images" element={<ImageManager />} />
        <Route path="/settings/*" element={<div>設定ページ（実装予定）</div>} />
        <Route
          path="*"
          element={
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <h1>404 - ページが見つかりません</h1>
              <p>お探しのページは存在しません。</p>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
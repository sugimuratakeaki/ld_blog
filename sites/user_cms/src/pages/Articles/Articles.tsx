import React from 'react';
import { clsx } from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/templates/Layout';
import { Card, CardHeader, CardBody } from '@/components/molecules/Card';
import { Table } from '@/components/molecules/Table';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { getAllArticles } from '@/data/mockData';
import type { PageProps, Article, TableColumn } from '@/types';

export interface ArticlesProps extends PageProps {}

export const Articles: React.FC<ArticlesProps> = ({ className, ...props }) => {
  const navigate = useNavigate();
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setArticles(getAllArticles());
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusBadgeVariant = (statusClass: string) => {
    switch (statusClass) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      default:
        return 'default';
    }
  };

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: TableColumn[] = [
    {
      key: 'title',
      title: 'タイトル',
      render: (value: string, record: Article) => (
        <div className="article-title-cell">
          <div className="article-title-cell__thumbnail">
            <img src={record.thumbnail} alt={record.title} loading="lazy" />
          </div>
          <div className="article-title-cell__content">
            <h4 className="article-title-cell__title">{value}</h4>
            <p className="article-title-cell__category">{record.category}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      title: 'ステータス',
      width: '120px',
      align: 'center',
      render: (value: string, record: Article) => (
        <Badge variant={getStatusBadgeVariant(record.statusClass)}>
          {record.statusLabel}
        </Badge>
      ),
    },
    {
      key: 'date',
      title: '日付',
      width: '120px',
      align: 'center',
    },
    {
      key: 'views',
      title: 'PV',
      width: '80px',
      align: 'right',
      render: (value: number) => value?.toLocaleString() || '-',
    },
    {
      key: 'comments',
      title: 'コメント',
      width: '80px',
      align: 'right',
      render: (value: number) => value?.toLocaleString() || '-',
    },
    {
      key: 'actions',
      title: '',
      width: '120px',
      align: 'center',
      render: (value: any, record: Article) => (
        <div className="article-actions">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate(`/articles/edit/${record.id}`)}
          >
            編集
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Layout title="記事管理" className={clsx('articles', className)} {...props}>
      <div className="articles__header">
        <div className="articles__header-content">
          <h1 className="articles__title">記事管理</h1>
          <p className="articles__subtitle">記事の作成・編集・管理を行います</p>
        </div>
        <div className="articles__header-actions">
          <Button 
            variant="primary"
            onClick={() => navigate('/articles/new')}
          >
            新しい記事を作成
          </Button>
        </div>
      </div>

      <Card className="articles__content">
        <CardHeader
          title={`記事一覧 (${filteredArticles.length}件)`}
          actions={
            <div className="articles__search">
              <Input
                type="search"
                placeholder="記事を検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="sm"
              />
            </div>
          }
        />
        <CardBody padding="none">
          <Table
            columns={columns}
            data={filteredArticles}
            loading={loading}
            striped
            hover
            onRowClick={(record) => {
              console.log('Edit article:', record.id);
            }}
          />
        </CardBody>
      </Card>
    </Layout>
  );
};
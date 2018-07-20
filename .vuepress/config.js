module.exports = {
  head: [
    ['link', { rel: 'ico', type: 'image/x-icon', href: '/favicon.ico' }]
  ],
  title: '科零组件库平台',
  description: '技术团队在线组件库、技术文档管理系统',
  serviceWorker: true,
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    sidebarDepth: 3,
    nav: [
      {
        text: '规范定义',
        items: [
          { text: '原型设计规范', link: '/standard/prototype/' },
          { text: '数据库设计规范', link: '/standard/database/' },
          { text: 'API设计规范', link: '/standard/api/' },
          { text: '版本控制', link: '/standard/version/' }
        ]
      },
      {
        text: '组件库',
        items: [
          {
            text: '前端组件',
            link: '/components/frontend/'
          },
          {
            text: '后端组件',
            link: '/components/backend/'
          }
        ]
      },
      {
        text: '代码库',
        link: 'https://github.com/trkeling'
      }
    ],
    sidebar: {
      '/standard/api/': [
        '',
        'status',
        'response',
        'security'
      ],
      '/standard/database/': [
        '',
        'basics',
        'table',
        'field',
        'indexes',
        'query',
        'separation'
      ],
      '/standard/prototype/': [
        '',
        'attention'
      ],
      '/standard/version/': [
        '',
        'initial',
        'command',
        'workflow'
      ],
      '/components/backend/': [
        '',
        'caidan',
        'tree',
        'city',
        'response',
        'support',
        'permission',
        'supervisor',
        'jpush',
        'yonghusq',
        'jwtauth',
      ],
      '/components/frontend/': [
        ''
      ]
    }
  }
}

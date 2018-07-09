module.exports = {
  title: 'Design System',
  description: 'The Minimum Viable Design System',
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
        text: 'Guthub',
        link: 'https://github.com/betterde'
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
        'response',
        'support',
        'permission',
        'supervisor',
        'jpush'
      ],
      '/components/frontend/': [
        ''
      ]
    }
  }
}

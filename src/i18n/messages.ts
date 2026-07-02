export type MessageKey = keyof typeof messages;

export const messages = {
  // ---- Extension / httpYac prompt ----
  'httpyac.message': {
    en: 'We recommend installing httpYac to run .http files. It offers the best support for .http format (environment variables, assertions, response handling, scripting).',
    zh: '推荐安装 httpYac 插件来运行 .http 文件，它对 .http 格式的支持最好（环境变量、断言、响应处理、脚本支持）。',
  },
  'httpyac.installLabel': {
    en: 'Install httpYac',
    zh: '安装 httpYac',
  },
  'httpyac.dismissLabel': {
    en: "Don't show again",
    zh: '不再提示',
  },

  // ---- Open command ----
  'open.notFound': {
    en: '{className}.http not found. Generate a request first.',
    zh: '未找到 {className}.http，请先生成请求。',
  },
  'open.blockNotFound': {
    en: 'No "{blockName}" request block found in {className}.http. Generate a request first.',
    zh: '{className}.http 中未找到 "{blockName}" 的请求块，请先生成请求。',
  },
  'open.selectBlock': {
    en: 'Select a {methodName} request block to open',
    zh: '选择要打开的 {methodName} 请求块',
  },
  'open.generateAction': {
    en: 'Generate HTTP Request',
    zh: '生成 HTTP 请求',
  },

  // ---- Open Controller command ----
  'openController.javaNotFound': {
    en: '{className}.java not found',
    zh: '未找到 {className}.java',
  },
  'openController.methodNotFound': {
    en: 'Opened {className}.java, but method "{methodName}" was not found',
    zh: '已打开 {className}.java，但未找到 "{methodName}" 方法',
  },

  // ---- Copy AI Prompt command ----
  'copyAiPrompt.blockNotFound': {
    en: 'Request block "{blockName}" not found',
    zh: '未找到 "{blockName}" 请求块',
  },
  'copyAiPrompt.javaNotFound': {
    en: '{className}.java not found',
    zh: '未找到 {className}.java',
  },
  'copyAiPrompt.methodNotFound': {
    en: 'Method "{methodName}" not found',
    zh: '未找到 "{methodName}" 方法',
  },
  'copyAiPrompt.copied': {
    en: 'AI parameter prompt copied to clipboard',
    zh: 'AI 参数生成提示词已复制到剪贴板',
  },

  // ---- Import Postman command ----
  'importPostman.selectFile': {
    en: 'Select a Postman Collection JSON file',
    zh: '选择 Postman Collection JSON 文件',
  },
  'importPostman.parseError': {
    en: 'Failed to parse Postman collection: {err}',
    zh: '解析 Postman Collection 失败：{err}',
  },
  'importPostman.noRequests': {
    en: 'No requests found in the Postman collection.',
    zh: 'Postman 集合中未找到请求。',
  },
  'importPostman.pickTarget': {
    en: 'Where to save the generated .http file?',
    zh: '生成的文件保存到哪里？',
  },
  'importPostman.defaultLocation': {
    en: 'Default Spring resources folder',
    zh: '默认 Spring resources 目录',
  },
  'importPostman.chooseFolder': {
    en: 'Choose a different folder...',
    zh: '选择其他目录...',
  },
  'importPostman.selectTarget': {
    en: 'Select target folder for .http file',
    zh: '选择 .http 文件的目标目录',
  },
  'importPostman.writeError': {
    en: 'Failed to write .http file: {err}',
    zh: '写入 .http 文件失败：{err}',
  },
  'importPostman.success': {
    en: 'Imported "{name}" — {count} requests → {file}',
    zh: '已导入 "{name}" — {count} 个请求 → {file}',
  },
} as const;

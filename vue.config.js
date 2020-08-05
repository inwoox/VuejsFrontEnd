module.exports = {
    devServer: { // api 요청이 있을때 어디에서 처리할지를 설정
        proxy: {
            '/api': {
                target: 'http://localhost:3000/api',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    publicPath: '/VuejsFrontEnd/',
    outputDir: 'docs'
        // outputDir: '../backend/public', // 배포 파일의 위치를 지정
}

// 위와 같이 /api 요청이 있을 때 해당 요청을 backend 쪽의 /api로 돌려주는 proxy 설정을 추가
// 그리고 frontend 프로젝트를 빌드 했을 때 output이 ../backend/
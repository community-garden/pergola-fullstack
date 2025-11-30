import * as generateAssets from '@vite-pwa/assets-generator'

const config = {
  preset: 'minimal-2023',
  images: {
    source: './src/assets/logo.svg', // You'll need to provide your source image
    output: './public',
    sizes: [64, 192, 512],
    padding: 0.3,
    background: '#ffffff',
    maskable: true,
    maskablePadding: 0.3,
    maskableBackground: '#ffffff',
    favicon: true,
    appleTouchIcon: true,
    appleTouchIconBackground: '#ffffff',
    appleTouchIconPadding: 0.3,
    appleTouchIconSize: 180,
    appleSplashScreen: false
  }
}

generateAssets(config)
  .then(() => console.log('PWA assets generated successfully!'))
  .catch((error) => console.error('Error generating PWA assets:', error)) 
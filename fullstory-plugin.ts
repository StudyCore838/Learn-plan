import type { Plugin } from 'vite'
import { V7_CONFIG } from './dev-tools/v7-config'

/**
 * FullStory Vite plugin to inject tracking only in development mode
 * This ensures FullStory is never included in production user apps
 * Uses EXACT same pattern as dev tools plugin
 */
export function fullStoryPlugin(): Plugin {
  return {
    name: 'fullstory-dev-injection',
    apply: 'serve', // Only apply in development mode
    enforce: 'pre', // Run before other plugins
    transform(code, id) {
      // Use EXACT same entry point detection as dev tools
      const isEntryPoint = V7_CONFIG.entryPoints.some(entry => id.includes(entry)) ||
                          (V7_CONFIG.hasEntryClient && id.includes('entry-client.tsx'))
      
      if (isEntryPoint) {
        console.log('🔍 FullStory plugin: Injecting into entry point...', id)
        
        // Find the last import statement
        const importRegex = /import.*from.*['"];?\s*$/gm
        const imports = code.match(importRegex)
        
        if (imports && imports.length > 0) {
          const lastImport = imports[imports.length - 1]
          const fullStoryInjection = `
// Auto-inject FullStory in development (EXACT same pattern as dev tools)
if (import.meta.env.MODE === 'development') {
  import('../dev-tools/src/fullstory-injector').then(({ injectFullStory }) => {
    injectFullStory();
  });
}`
          
          const result = code.replace(lastImport, lastImport + fullStoryInjection)
          console.log('✅ FullStory auto-injection added to entry point')
          return result
        }
      }
      
      return null
    }
  }
}

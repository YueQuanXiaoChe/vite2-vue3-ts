/**
 * Package file volume analysis
 */
import visualizer from 'rollup-plugin-visualizer';
import { isReportMode } from '../../utils';

export function configVisualizerConfig() {
  if (isReportMode()) {
    return visualizer({
      filename: '.cache/visualizer/stats.html', // 带有要生成的图表的文件的名称
      sourcemap: false,
      open: true,
      // @ts-ignore
      gzipSize: true, // 从源代码收集gzip大小并在图表上显示
      // @ts-ignore
      brotliSize: true // 从源代码收集brolti大小并在图表上显示。仅在当前节点版本支持时
    }) as Plugin;
  }
  return [];
}

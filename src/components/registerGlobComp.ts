import { App } from 'vue';
import { Button, Field, CellGroup, Dialog, Toast, Notify } from 'vant';

const compList = [Button, Field, CellGroup, Dialog, Toast, Notify];

export function registerGlobComp(app: App) {
  compList.forEach((comp: any) => {
    app.component(comp.name || comp.displayName, comp);
  });
}

import Symbiote, { css } from '@symbiotejs/symbiote';

export class XUiCtx extends Symbiote {
  initCallback() {
    let readFrom = this.getAttribute('read-from');
    if (readFrom) {
      this.sub(readFrom, (val) => {
        this.setAttribute('ui-ctx', val);
      });
    }
  }
}

const uxCtxList = [
  'images',
  'ims',
  'json',
  'object-ui',
  'stories',
  'video',
  'ai',
];

XUiCtx.rootStyles = css`
x-ui-ctx {
  display: contents;
  ${uxCtxList.map(ctx => `
    &:not([ui-ctx="${ctx}"]) > [ui-ctx="${ctx}"] {
      display: none;
    }
  `).join('')}
}
`;

XUiCtx.reg('x-ui-ctx');
import { X } from '../core/X.js';
export class XJSDA extends X {

  initCallback() {
    this.sub('src', async (/** @type {String} */ val) => {
      // this.applyOuterHTML(await this.getDwa(val));
    });
  }

}

XJSDA.bindAttributes({
  src: 'src',
});

XJSDA.reg('x-dwa');

export default XJSDA;
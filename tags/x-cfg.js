import { X } from '../core/X.js';

class XCfgRow extends X {

  isoMode = true;

  /** @type {XCfg} */
  get parent() {
    return this.closest('x-cfg');
  }

  init$ = {
    onRemove: () => {
      if (!window.confirm(this.$['^confirmMsg'])) {
        return;
      }
      if (Array.isArray(this.parent.$.data)) {
        let result = [...this.parent.$.data];
        let idx = parseFloat(this.$.key);
        result.splice(idx, 1);
        this.parent.$.data = result;
        console.log(result);
      } else {
        delete this.parent.$.data[this.$.key];
      }
      this.dispatchEvent(new Event('input', {
        bubbles: true,
      }));
      this.dispatchEvent(new Event('change', {
        bubbles: true,
      }));
      this.remove();
    },
  }

  cssInit$ = {
    '--remove': '❌',
  }

  initCallback() {
    this.sub('value', (val) => {
      this.ref.value.innerHTML = '';
      /** @type {String} */
      let valType = typeof val;
      if (this.$.key === 'password') {
        valType = 'password';
      }
      let renderInput = (type) => {
        let input = document.createElement('input');
        input.type = type;
        if (valType === 'boolean') {
          input.checked = val;
        } else {
          input.value = val;
        }
        this.ref.value.appendChild(input);
        input.oninput = () => {
          if (valType === 'number') {
            this.parent.$.data[this.$.key] = parseInt(input.value);
          } else if (valType === 'string' || valType === 'password') {
            this.parent.$.data[this.$.key] = input.value;
          } else if (valType === 'boolean') {
            this.parent.$.data[this.$.key] = input.checked;
          }
        };
      };
      let valMap = {
        string: () => {
          renderInput('text');
        },
        password: () => {
          renderInput('password');
        },
        number: () => {
          renderInput('number');
        },
        boolean: () => {
          renderInput('checkbox');
        },
        object: () => {
          let xTable = new XCfg();
          window.customElements.whenDefined('x-cfg').then(() => {
            xTable.$.data = val;
          });
          if (this.parent.hasAttribute('editable')) {
            xTable.setAttribute('editable', '');
          }
          if (Array.isArray(val)) {
            xTable.setAttribute('is-array', '');
          }
          this.ref.value.appendChild(xTable);
        },
      }
      valMap[valType]();
    });
  }
}

XCfgRow.rootStyles = /*css*/ `
x-cfg-row {
  display: table-row;

  td.key {
    text-align: right;
  }

  td.value {
    width: 100%;
  }
}
x-cfg-row td.row-btn {
  display: none;
}
x-cfg[editable] td.row-btn {
  display: table-cell;
}
`;

XCfgRow.template = /*html*/ `
<td class="key">{{key}}</td>
<td class="value" ref="value"></td>
<td class="row-btn">
  <button bind="onclick: onRemove">{{--remove}}</button>
</td>
`;

XCfgRow.reg('x-cfg-row');

export class XCfg extends X {

  isoMode = true;

  init$ = {
    data: {},
    exclude: [],
    editable: false,
    tbodyData: [],
    confirmMsg: 'Are you sure?',
    addField: () => {
      let type = this.ref.typeSelect.value;
      /** @type {unknown} */
      let val = 'text';
      if (type === 'Number') {
        val = 0;
      } else if (type === 'Boolean') {
        val = false;
      } else if (type === 'Object') {
        val = {};
      } else if (type === 'Array') {
        val = [];
      }
      if (this.hasAttribute('is-array')) {
        this.$.data.push(val);
      } else {
        let fName = this.ref.fieldName.value.trim();
        if (!fName) {
          return;
        }
        this.$.data[fName] = val;
      }
      this.applyData(this.$.data);
    },
  }

  cssInit$ = {
    '--add': 'Add',
    '--string': 'String',
    '--number': 'Number',
    '--boolean': 'Boolean',
    '--object': 'Object',
    '--array': 'Array',
  }

  applyData(data) {
    let rData = [];
    for (let key in data) {
      if (!this.$.exclude.includes(key)) {
        rData.push({
          key,
          value: data[key],
        });
      }
    } 
    this.$.tbodyData = rData;
  }

  initCallback() {
    this.sub('data', (data) => {
      this.applyData(data);
    });
    this.getData().then((data) => {
      if (!data) return;
      this.$.data = data;
    });
  }

  get value() {
    return this.$.data;
  }
}

XCfg.bindAttributes({
  editable: 'editable',
});

XCfg.rootStyles = /*css*/ `
x-cfg {
  position: relative;
  display: inline-block;
  margin: 20px;
  min-width: 50%;

  table {
    width: 100%;
    background-color: rgba(0, 0, 0, .1);
    border-radius: 8px;
  }

  x-cfg-row {
    td {
      padding: 6px;
      background-color: #fff;
      border-radius: 4px;
      vertical-align: top;
    }
    &:nth-of-type(even) > td {
      background-color: rgb(244, 253, 255) !important;
    }
  }

  .toolbar {
    display: none;
    gap: 4px;
    margin-top: 10px;
    padding: 6px;
    background-color: rgba(0, 0, 0, .05);
    border-radius: 6px;
    border: 1px solid rgba(0, 0, 0, .2);
  }

  &[editable]  {
    .toolbar {
      display: inline-flex;
    }
  }

  &[is-array] {
    input.field-name {
      display: none;
    }
  }

  button {
    filter: grayscale(1);
    transition: .2s;
    cursor: pointer;
    border: none;
    opacity: .6;

    &:hover {
      filter: none;
      opacity: 1;
    }
  }

  input[type="text"] {
    width: 100%;
  }
}
`;

XCfg.template = /*html*/ `
<table>
  <tbody
    itemize="tbodyData"
    item-tag="x-cfg-row"></tbody>
</table>
<div class="toolbar editable">
  <input class="field-name" type="text" ref="fieldName">
  <select ref="typeSelect">
    <option>{{--string}}</option>
    <option>{{--number}}</option>
    <option>{{--boolean}}</option>
    <option>{{--object}}</option>
    <option>{{--array}}</option>
  </select>
  <button bind="onclick: addField">{{--add}}</button>
</div>
`;

XCfg.reg('x-cfg');

export default XCfg;
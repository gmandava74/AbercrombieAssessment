import {
  inValidValidation,
  generateList
} from '../getData';
import { isEqualArray } from '../_utils/array';
let url = "https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js";
function include(url)
  {
    var s = document.createElement("script");
    s.setAttribute("type", "text/javascript");
    s.setAttribute("src", url);
    var nodes = document.getElementsByTagName("*");
    var node = nodes[nodes.length -1].parentNode;
    node.appendChild(s);
  }

describe('getData', () => {

describe('inValidValidation', () => {
  it('inValidValidation', async () => {
    let testId = "dummy-testId";
    let newDiv = document.createElement("div");
    newDiv.setAttribute("id", testId);
    document.body.appendChild(newDiv);
    const invalid = inValidValidation(testId);
    expect(newDiv.style.display).toBe('none');
  });

  it('generateList', async () => {
    include(url);
    let testId = "usersList";
    let newDiv = document.createElement("div");
    newDiv.setAttribute("id", testId);
    document.body.appendChild(newDiv);
    const invalid = generateList(testId);
    console.log(newDiv.innerHTML);
  });
});
});

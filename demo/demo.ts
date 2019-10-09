import { Snippet } from '../lib/Snippet';

const examples = [
  {
    name: 'Beautiful Love',
    snippet: `
  |: E-7b5    | A7b9      | D-     | %          |
  |  G-7      | C7        | F^7    | E-7b5 A7b9 |
  |1 D-       | G-7       | Bb7    | A7b9       |
  |  D-       | G7#11     | E-7b5  | A7b9      :|
  |2 D-       | G-7       | Bb7    | A7b9       |
  |  D- B7    | Bb7#11 A7 | D-     | %          |
  `,
  },
  {
    name:'Da Capo',
    snippet: `| A (DC) | B |`
  },
  {
    name:'DC + Fine',
    snippet: `| A (Fi) | B (DC) |`
  },
  {
    name:'DC + Coda',
    snippet: `| A (2Q) | B (DC) | (Q) C |`
  },
  {
    name:'DS',
    snippet: `| A | (S) B (DS) | C |`
  },
  {
    name:'DS al Fine',
    snippet: `| A | (S) B (Fi) | C (DS) |`
  },
  {
    name:'DS al Coda',
    snippet: `| A | (S) B (2Q) | C (DS) | (Q) D |`
  },
];

const snippet = `
|: E-7b5    | A7b9      | D-     | %          |
|  G-7      | C7        | F^7    | E-7b5 A7b9 |
|1 D-       | G-7       | Bb7    | A7b9       |
|  D-       | G7#11     | E-7b5  | A7b9      :|
|2 D-       | G-7       | Bb7    | A7b9       |
|  D- B7    | Bb7#11 A7 | D-     | %          |
`;

window.onload = () => {
  const editor: any = document.getElementById('editor');
  const json: any = document.getElementById('json');
  const expanded: any = document.getElementById('expanded');
  const expandedJson: any = document.getElementById('json-expanded');

  examples.forEach((example, index) => {
    const option = document.createElement('option');
    option.innerHTML = example.name;
    option.setAttribute('value', index + '');
    document.getElementById('examples').appendChild(option);
  });

  document.getElementById('examples').addEventListener('change', (e) => {
    const example = examples[e.target['value']];
    editor.value = Snippet.format(example.snippet);
    parse();
  })
  document.getElementById('format').addEventListener('click', () => {
    editor.value = Snippet.format(editor.value);
  });
  document.getElementById('minify').addEventListener('click', () => {
    editor.value = Snippet.minify(editor.value);
  });
  document.getElementById('minifyUrlsafe').addEventListener('click', () => {
    editor.value = Snippet.minify(editor.value, true);
  });
  function parse() {
    json.value = JSON.stringify(Snippet.parse(editor.value), null, 2);
    expanded.value = Snippet.expand(editor.value);

    expandedJson.value = JSON.stringify(Snippet.render(editor.value), null, 2);
  }
  editor.addEventListener('onchange', () => {
    parse();
  })
  editor.addEventListener('keyup', () => {
    parse();
  })

  editor.value = Snippet.format(snippet);
  parse();
  document.addEventListener('click', () => {
    parse();
  })
}
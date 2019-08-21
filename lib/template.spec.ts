// tslint:disable:no-expression-statement
import test from 'ava';
import getEngine from './template';

const templateEngine = getEngine(process.cwd());

test('renderString #1', t => {
  const body = `{{ str | patchYamlArray }}`;
  const str = `IP-CIDR,67.198.55.0/24,Proxy,no-resolve`;
  const result = templateEngine.renderString(body, {
    str,
  });

  t.is(result, `- IP-CIDR,67.198.55.0/24,Proxy`);
});

test('renderString #2', t => {
  const body = `{{ str | patchYamlArray }}`;
  const str = `IP-CIDR,67.198.55.0/24,Proxy,no-resolve // test rule`;
  const result = templateEngine.renderString(body, {
    str,
  });

  t.is(result, `- IP-CIDR,67.198.55.0/24,Proxy`);
});

test('renderString #3', t => {
  const body = `{{ str | patchYamlArray }}`;
  const str = `PROCESS-NAME,Telegram,Proxy,no-resolve // test rule`;
  const result = templateEngine.renderString(body, {
    str,
  });

  t.is(result, '');
});

test('renderString #4', t => {
  const body = `{{ str | patchYamlArray }}`;
  const str = `# Comment`;
  const result = templateEngine.renderString(body, {
    str,
  });

  t.is(result, '# Comment');
});
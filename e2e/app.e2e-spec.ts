import { LumberjackPage } from './app.po';

describe('lumberjack App', () => {
  let page: LumberjackPage;

  beforeEach(() => {
    page = new LumberjackPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

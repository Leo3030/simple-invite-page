import { render } from 'enzyme';
import App from "../App";

describe('<App />', () => {
  it('render request btn', () => {
    const app = render(<App />);
    const btn = app.find("[jest-id='request-btn']");
    
    expect(btn.length).toEqual(1);
  });
});

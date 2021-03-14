import { render, mount } from 'enzyme';
import sinon from 'sinon';
import App from "../App";

describe('<App />', () => {
  it('render request btn', () => {
    const app = render(<App />);
    const btn = app.find("[jest-id='request-btn']");
    
    expect(btn.length).toEqual(1);
  });

  it('show modal when click request btn', () => {
    const wrapper = mount(<App />);
    // wrapper.find("[jest-id='request-btn']").simulate('click');
    // expect(onButtonClick).to.have.property('callCount', 1);
  });
});

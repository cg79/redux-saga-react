import { render, screen } from "@testing-library/react";
import { shallow, configure } from "enzyme";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import Adapter from 'enzyme-adapter-react-16';

import App from "./App";

configure({ adapter: new Adapter() })


const mockStore = configureMockStore();
const store = mockStore({
  userReducer:{items:[]}
});

test("renders with shallow", () => {
  render(
    shallow(
      <Provider store={store}>
        <App />
      </Provider>
    )
  );
  const linkElement = screen.getByTestId("test");
  expect(linkElement).toBeInTheDocument();
});

test("renders learn react link", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByTestId("test");
  expect(linkElement).toBeInTheDocument();
});

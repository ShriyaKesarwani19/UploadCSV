import React from "react";
import renderer from "react-test-renderer";
import FileUpload from "./FileUpload";
import { shallow, mount } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("FileUpload component tests", () => {
  const wrapper = shallow(<FileUpload />);

  it("Form test", () => {
    expect(wrapper.find("form")).toHaveLength(1);
  });
  describe("<form />", () => {
    it("`<form>` element should have a onSubmit attribute", () => {
      expect(wrapper.props().onSubmit).toBeDefined();
    });
  });

  it("onSubmit attribute should be of type `function`", () => {
    expect(typeof wrapper.props().onSubmit === "function").toBe(true);
  });

  it("`<form>` element should have an `<input />` element", () => {
    expect(
      wrapper
        .find("form")
        .childAt(0)
        .type()
    ).toBe("input");
  });

  describe("<input />", () => {
    it("`<input>` element should be of type `text`", () => {
      expect(
        wrapper
          .find("form")
          .childAt(0)
          .props().type
      ).toBe("text");
    });
  });

  it("`<input>` element should have a placeholder attribute with value `Enter Jira number`", () => {
    expect(
      wrapper
        .find("form")
        .childAt(0)
        .props().placeholder
    ).toBe("Enter Jira number");
  });

  it("`<input>` element should have an onChange attribute", () => {
    expect(
      wrapper
        .find("form")
        .childAt(0)
        .props().onChange
    ).toBeDefined();
  });

  it("onChange attribute should be of type `function`", () => {
    expect(
      typeof wrapper
        .find("form")
        .childAt(0)
        .props().onChange === "function"
    ).toBe(true);
  });

  it("`<form>` element should have an `<p>` element", () => {
    expect(
      wrapper
        .find("form")
        .childAt(2)
        .type()
    ).toBe("p");
  });
  describe('<input type="submit" />', () => {
    it("`<input>` element should be of type `submit`", () => {
      expect(
        wrapper
          .find("form")
          .childAt(3)
          .props().type
      ).toBe("submit");
    });
  });
  it("`<input />` element should have a className", () => {
    expect(
      wrapper
        .find("form")
        .childAt(3)
        .hasClass("btn btn-primary float-left")
    ).toBe(true);
  });
  describe('<input type="submit" />', () => {
    it("`<input>` element should be of type `submit`", () => {
      expect(
        wrapper
          .find("form")
          .childAt(4)
          .props().type
      ).toBe("submit");
    });
  });
  it("`<input />` element should have a className", () => {
    expect(
      wrapper
        .find("form")
        .childAt(4)
        .hasClass("btn btn-primary float-right")
    ).toBe(true);
  });
  it("should have input for jira and file input", () => {
    const wrapper = shallow(<FileUpload />);
    //Email and password input field should be present
    expect(wrapper.find("input#jira")).toHaveLength(1);
    expect(wrapper.find("input#customFile")).toHaveLength(1);
    expect(wrapper.find("input#upload")).toHaveLength(1);
    expect(wrapper.find("input#update")).toHaveLength(1);
  });
  it("`<input />` element should have a value attribute", () => {
    expect(
      wrapper
        .find("form")
        .childAt(3)
        .props().value
    ).toBe("Upload");
  });
  it("`<input />` element should have a value attribute", () => {
    expect(
      wrapper
        .find("form")
        .childAt(4)
        .props().value
    ).toBe("Update");
  });

  it("should have proper props for jira field", () => {
    expect(
      wrapper
        .find("form")
        .childAt(0)
        .props()
    ).toEqual({
      className: "form-control",
      id: "jira",
      name: "jirano",
      onChange: expect.any(Function),
      placeholder: "Enter Jira number",
      type: "text"
    });
  });

  it("should have onChange function for uploading the file", () => {
    // given
    const component = shallow(<FileUpload />);
    const form = component.find("input#jira");
    // when
    form.props().onChange({
      target: {
        name: "jirano",
        value: "myValue"
      }
    });
  });
  it("Test for onChange function for uploading a file", () => {
    // given
    const component = shallow(<FileUpload />);
    const form = component.find("input#customFile");
    // when
    form.props().onChange({
      target: {
        files: "Sample.csv"
      }
    });
  });
  it("calls onSubmit prop function when form is submitted", () => {
    const onSubmit = jest.fn();
    const wrapper = mount(<form onSubmit={onSubmit} />);
    const form = wrapper.find("form");
    form.simulate("submit");
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
it("renders correctly", () => {
  const tree = renderer.create(<FileUpload />).toJSON();
  expect(tree).toMatchSnapshot();
});

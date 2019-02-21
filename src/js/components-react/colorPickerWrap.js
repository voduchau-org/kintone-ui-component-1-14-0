import React, {Component, PureComponent} from 'react';
import debounce from 'lodash/debounce';
import color from 'react-color/lib/helpers/color';

export const ColorWrap = (Picker) => {
  class ColorPicker extends (PureComponent || Component) {
    constructor(props) {
      super();
      if (props.hasOwnProperty('color')) {
        this.state = {
          ...color.toState(props.color, 0),
        };
      } else {
        this.state = {
          hex: '',
          hsl: {a: '',
            h: '',
            l: '',
            s: '',
          },
          hsv: {a: '',
            h: '',
            s: '',
            v: '',
          },
          oldHue: '',
          rgb: {a: '',
            b: '',
            g: '',
            r: '',
          }
        };
      }

      this.debounce = debounce((fn, data, event) => {
        fn(data, event);
      }, 100);
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        ...color.toState(nextProps.color, this.state.oldHue),
      });
    }

    handleChange = (data, event) => {
      if (data.source === 'hex' && data.hex === '') {
        this.setState({
          color: ''
        });
        return true;
      }
      const isValidColor = color.simpleCheckForValidColor(data);
      if (isValidColor) {
        const colors = color.toState(data, data.h || this.state.oldHue);
        this.setState(colors);
        this.props.onChangeComplete && this.debounce(this.props.onChangeComplete, colors, event);
        this.props.onChange && this.props.onChange(colors, event);
      }
      return true;
    }

    handleSwatchHover = (data, event) => {
      const isValidColor = color.simpleCheckForValidColor(data);
      if (isValidColor) {
        const colors = color.toState(data, data.h || this.state.oldHue);
        this.setState(colors);
        this.props.onSwatchHover && this.props.onSwatchHover(colors, event);
      }
    }

    render() {
      const optionalEvents = {};
      if (this.props.onSwatchHover) {
        optionalEvents.onSwatchHover = this.handleSwatchHover;
      }

      const isColorSetted = this.state.hasOwnProperty('color');
      if (isColorSetted) {
        if (this.state.color === '') {
          this.state = {
            ...this.state,
            ...{
              hex: '',
              hsl: {a: '',
                h: '',
                l: '',
                s: '',
              },
              hsv: {a: '',
                h: '',
                s: '',
                v: '',
              },
              oldHue: '',
              rgb: {a: '',
                b: '',
                g: '',
                r: '',
              }
            }
          };
        } else {
          this.state = {
            ...this.state,
            ...color.toState(this.state.color, 0),
          };
        }

        delete this.state.color;
      }

      this.props.color = this.state.hex;

      return (
        <Picker
          {...this.props}
          {...this.state}
          isColorSetted={isColorSetted}
          onChange={this.handleChange}
          {...optionalEvents}
          ref={c => (this.inner = c)}
        />
      );
    }
  }

  ColorPicker.propTypes = {
    ...Picker.propTypes,
  };

  ColorPicker.defaultProps = {
    ...Picker.defaultProps
  };

  return ColorPicker;
};

export default ColorWrap;

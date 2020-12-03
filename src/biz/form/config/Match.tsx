import { Input } from "antd";
import React from "react";

enum ComponentType{
Input="input",
Textarea="textarea",

}

export function matchComponment(config:any,el:any) {
  switch(el.type){
    case ComponentType.Input:
      return (
        <Input
          style={{ width: el.options.width }}
          size={config.size}
          placeholder={el.options.placeholder}
        />
      );
    case ComponentType.Textarea:
      return (
        <Input.TextArea
          style={{ width: el.options.width }}
          rows={4}
          size={config.size}
          placeholder={el.options.placeholder}
          defaultValue={el.options.defaultValue}
        />
      );
    // case "radio":
    //   return (
    //     <Radio.Group defaultValue={defaultValue}>
    //       {el.options.options.map((el2: any, j: number) => (
    //         <Radio value={el2.value} key={j}>
    //           {el2.label}
    //         </Radio>
    //       ))}
    //     </Radio.Group>
    //   );
    // case "checkbox":
    //   return (
    //     <Checkbox.Group
    //       options={el.options.options}
    //       defaultValue={defaultValue}
    //     />
    //   );
    // case "select":
    //   return (
    //     <Select
    //       style={{ width: el.options.width, minWidth: "180px" }}
    //       size={config.size}
    //       placeholder={placeholder}
    //       defaultValue={
    //         common.isEmpty(defaultValue)
    //           ? undefined
    //           : defaultValue
    //       }
    //     >
    //       {el.options.options.map((el2: any, j: number) => (
    //         <Select.Option value={el2.value} key={j}>
    //           {el2.label}
    //         </Select.Option>
    //       ))}
    //     </Select>
    //   );
    // case "date":
    //   return (
    //     <DatePicker
    //       style={{ width: el.options.width }}
    //       size={config.size}
    //       showTime={el.options.format === "YYYY-MM-DD HH:mm"}
    //       format={el.options.format}
    //     />
    //   );
    // case "switch":
    //   return (
    //     <Switch
    //       defaultChecked={defaultValue}
    //       size={config.size}
    //     />
    //   );

    default:
      break;
  }
  
}

import React, {createElement, ForwardRefExoticComponent, Suspense, useRef} from "react";
import {ButtonProps} from "antd/es/button";
import ReactDOM from "react-dom";
import {useState} from "react";
import {Modal, Drawer} from "antd";
import {ButtonType} from "antd/es/button";
import Loading from "./Loading";

declare const PlacementTypes: ["right", "top", "bottom", "left"];
declare type placementType = (typeof PlacementTypes)[number];

interface Props<T> {
  type: T;
  width?: number;
  title?: string;
  content: ForwardRefExoticComponent<any>;
  keyboard?: boolean;
  mask?: boolean;
  maskClosable?: boolean;
  closable?: boolean;
  onCancel?: () => void;
  onOk?: () => void;
  // DrawerProps
  placement?: T extends "drawer" ? placementType : never;
  // ModalProps
  cancelText?: T extends "modal" ? string : never;
  okText?: T extends "modal" ? string : never;
  okType?: T extends "modal" ? ButtonType : never;
  okButtonProps?: T extends "modal" ? ButtonProps : never;
  cancelButtonProps?: T extends "modal" ? ButtonProps : never;
  centered?: T extends "modal" ? boolean : never;
  footer?: T extends "modal" ? string|React.ReactNode : never;
}

export interface DialogCallbackRef {
  onOk: () => Promise<void>;
  onCancel: () => Promise<void>;
}

export const showDialog = <T extends "drawer"|"modal">(props: Props<T>) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  function destroy() {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);

    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  const DrawerDialog = () => {
    const [visible, setVisible] = useState<boolean>(true);

    return (
      <Drawer
        bodyStyle={{ height: '100%', overflowY: 'scroll' }}
        drawerStyle={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
        title={props.title}
        placement={props.placement}
        width={props.width}
        keyboard={props.keyboard}
        mask={props.mask}
        maskClosable={props.maskClosable}
        closable={props.closable}
        onClose={() => setVisible(false)}
        visible={visible}
      >
        <Suspense fallback={<Loading />}>
          {createElement(props.content)}
        </Suspense>
      </Drawer>
    )
  };

  const ModalDialog = () => {
    const [visible, setVisible] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    const ref = useRef<DialogCallbackRef>(null);

    return (
      <Modal
        title={props.title}
        width={props.width}
        cancelText={props.cancelText || "Voltar"}
        okText={props.okText || "Salvar"}
        okType={props.okType}
        okButtonProps={props.okButtonProps}
        cancelButtonProps={props.cancelButtonProps}
        centered={props.centered}
        footer={props.footer}
        keyboard={props.keyboard}
        mask={props.mask}
        maskClosable={props.maskClosable}
        closable={props.closable}
        visible={visible}
        onOk={() => {
          setLoading(true);
          ref.current && ref.current.onOk().finally(() => setLoading(false));
        }}
        afterClose={destroy}
        onCancel={() => {
          ref.current &&  ref.current.onCancel().then(() => setVisible(false))
        }}
        confirmLoading={loading}
      >
        <Suspense fallback={<Loading />}>
          {createElement(props.content, { ref })}
        </Suspense>
      </Modal>
    );
  };

  ReactDOM.render(React.createElement(props.type === "drawer" ? DrawerDialog : ModalDialog), div);
};

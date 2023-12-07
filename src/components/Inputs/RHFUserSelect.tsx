import { Transition } from "react-transition-group";
import {
  ModalContainer,
  Portal,
  PortalOverlay,
  overlayTransition,
} from "../Modals/Portal";
import { ChangeEventHandler, useEffect, useState } from "react";
import { hideScrollbar, showScrollbar } from "@/utils/scrollbar";
import {
  ErrorMessage,
  IconLabel,
  InputLabel,
  OptionItem,
  OptionVisible,
  Placeholder,
  SelectContainer,
} from "@/styles/InputStyles";
import SelectModalActions from "./SelectModalActions";
import getErrorMessage from "@/utils/errorResponses";
import toast from "react-hot-toast";
import axios from "axios";
import Input from "./Input";
import UserSVG from "../svg/UserSVG";
import { UserDTO } from "@/schemas/UserSchema";
import RHFInput from "./RHFInput";
import {
  UseFormRegisterReturn,
  Control,
  useWatch,
  Controller,
} from "react-hook-form";

type Config = {
  name: string;
  placeholder: string;
  type?:
    | "text"
    | "date"
    | "number"
    | "password"
    | "textarea"
    | "month"
    | "email";
  icon: React.ReactNode;
};

type RHFUserSelectProps = {
  url: string;
  config: Config;
  // register: UseFormRegisterReturn<any>;
  error: string | undefined;
  control: Control<any>;
};

export default function RHFUserSelect({
  url,
  config,
  // register,
  error,
  control,
}: RHFUserSelectProps) {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<UserDTO[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const u = await axios.get<UserDTO[]>(url);
        setUsers(u.data);
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    };

    getUsers();
  }, [url]);

  const refreshData = async () => {
    try {
      const u = await axios.get<UserDTO[]>(url);
      setUsers(u.data);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <Controller
      control={control}
      name={config.name}
      render={({
        field: { onChange, onBlur, value },
        formState: { errors },
      }) => (
        <>
          <Portal>
            <Transition
              in={show}
              timeout={400}
              unmountOnExit={true}
              onEnter={hideScrollbar}
              onExit={showScrollbar}
            >
              {(state) => (
                <ModalContainer $z="10">
                  <PortalOverlay
                    $z="10"
                    style={{ ...overlayTransition[state] }}
                    onClick={() => setShow(false)}
                  />
                  <SelectContainer style={{ ...overlayTransition[state] }}>
                    <SelectModalActions
                      title="Usuarios"
                      closeModal={() => setShow(false)}
                      refreshData={refreshData}
                    />
                    <Input
                      config={{
                        icon: <UserSVG />,
                        name: "select_modal_input",
                        placeholder: "Nombre",
                      }}
                      setValue={(e) => {
                        setSearch(e.target.value);
                      }}
                      value={search}
                      error=""
                    />
                    <div
                      style={{
                        maxHeight: "7.5rem",
                        minHeight: "7.5rem",
                        overflowY: "scroll",
                      }}
                    >
                      {users
                        .filter((user) =>
                          user.name.toLowerCase().includes(search.toLowerCase())
                        )
                        .map((user) => (
                          <OptionItem
                            onClick={() => {
                              onChange(user.name);
                              setShow(false);
                              setSearch("");
                            }}
                            key={user.id}
                          >
                            <p>{user.name}</p>
                            <p
                              style={{
                                fontSize: "0.75rem",
                                color: "var(--text-secondary)",
                                marginLeft: "auto",
                              }}
                            >
                              {user.area}
                            </p>
                          </OptionItem>
                        ))}
                    </div>
                  </SelectContainer>
                </ModalContainer>
              )}
            </Transition>
          </Portal>
          <InputLabel
            $error={Boolean(error)}
            onClick={() => setShow(!show)}
            onBlur={onBlur}
          >
            <Placeholder
              $active={value === 0 || Boolean(value)}
              $error={Boolean(error)}
            >
              {config.placeholder}
            </Placeholder>
            {value}
            <IconLabel>
              <UserSVG />
            </IconLabel>
            {Boolean(error) && <ErrorMessage>{error}</ErrorMessage>}
          </InputLabel>
        </>
      )}
    />
  );
}

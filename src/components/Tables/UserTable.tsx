import { UserDTO } from "@/schemas/UserSchema";
import { Table, Td } from "@/styles/TableStyles";
import React from "react";
import { objectIdToDateFormat } from "@/utils/texts";
import ButtonActionsTable, { ButtonTh } from "../Buttons/ButtonActionsTable";

export default function UserTable({ users }: { users: UserDTO[] }) {
  return (
    <div
      style={{
        overflow: "hidden visible",
        marginTop: "0.625rem",
      }}
    >
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Area</th>
            <th>Fecha ingreso</th>
            <ButtonTh />
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <Td $w="100%">{user.id}</Td>
                <Td $minw="5rem">{user.name}</Td>
                <Td $minw="10rem">{user.email}</Td>
                <Td>{user.role}</Td>
                <Td>{user.area}</Td>
                <Td $minw="12.5rem">{objectIdToDateFormat(user.id)}</Td>
                <ButtonActionsTable
                  editUrl={`/users/edit/${user.id}`}
                  deleteUrl={`/api/users/${user.id}`}
                />
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

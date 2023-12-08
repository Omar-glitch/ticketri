import RefreshButton from "@/components/Buttons/RefreshButton";
import NotFoundTable from "@/components/Tables/NotFoundTable";
import UserTable from "@/components/Tables/UserTable";
import FilterSVG from "@/components/svg/FilterSVG";
import getMetadata from "@/lib/metadata";
import { UserDTO } from "@/schemas/UserSchema";
import { Button, IconButton } from "@/styles/ButtonStyles";
import { Flex, Main } from "@/styles/GlobalStyles";
import { getObjects } from "@/utils/objectQueries";
import Link from "next/link";

export const metadata = getMetadata({
  title: "Usuarios",
  description: "Lista de usuarios",
  addCompanyNameInTitle: true,
  url: "/users",
});

export const dynamic = "force-dynamic";

export default async function Page() {
  const users: UserDTO[] = await getObjects("http://localhost:3000/api/users");

  return (
    <Main>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "62.5rem",
          width: "96%",
          margin: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <h1 style={{ fontSize: "1.5rem", color: "var(--text)" }}>Usuarios</h1>
          <Flex $ml="0.25rem">
            <RefreshButton size="2.25rem" color="primary" />
            <IconButton
              $size="2.25rem"
              $p="0.25rem"
              $color="primary"
              title="Filtrar usuarios"
            >
              <FilterSVG />
            </IconButton>
            <Button
              as={Link}
              href="/users/new"
              $color="primary"
              title="Añadir usuario"
            >
              Añadir usuario
            </Button>
          </Flex>
        </div>
        <div style={{ overflow: "hidden visible" }}>
          {users.length ? <UserTable users={users} /> : <NotFoundTable />}
        </div>
      </div>
    </Main>
  );
}

import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button, Divider,
} from '@mantine/core';
import { Helmet } from "react-helmet";
import { IconBrandFacebook, IconBrandGoogle } from "@tabler/icons-react";
import { useContext } from 'react';
import { AuthContext } from '../context/auth/AuthContext';

const LoginPage = () => {


    const { user, status, startGoogleSignIn } = useContext(AuthContext);

    console.log(user, status);
    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <Container size={420} my={40}>
                <Title
                    align="center"
                    sx={() => ({ fontWeight: 900 })}
                >
                    Bienvenido a Givers
                </Title>
                <Text color="dimmed" size="sm" align="center" mt={5}>
                    No tienes cuenta?{' '}
                    <Anchor size="sm" component="button">
                        Crear cuenta
                    </Anchor>
                </Text>

                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <Group grow mb="md" mt="md">
                        {/* <Button radius="xl" leftIcon={<IconBrandFacebook size={18} />}>Facebook</Button> */}
                        <Button onClick={startGoogleSignIn} radius="xl" leftIcon={<IconBrandGoogle size={18} />}>Google</Button>
                    </Group>
                    <Divider label="O ingresa con tu correo electrónico" labelPosition="center" my="lg" />
                    <TextInput label="Correo electrónico" placeholder="givers@givers.com" required />
                    <PasswordInput label="Contraseña" placeholder="******" required mt="md" />
                    <Group position="apart" mt="lg">
                        <Checkbox label="Recordarme" />
                        <Anchor component="button" size="sm">
                            Olvidaste tu contraseña?
                        </Anchor>
                    </Group>
                    <Button fullWidth mt="xl">
                        Iniciar sesión
                    </Button>
                </Paper>
            </Container>
        </>
    );
}

export default LoginPage;

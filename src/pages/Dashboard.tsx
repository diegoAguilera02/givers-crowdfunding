import {
    Box,
    Button,
    Card,
    Container,
    createStyles,
    Flex,
    Group,
    Paper,
    PaperProps,
    rem,
    SimpleGrid,
    Stack,
    Text,
    Title,
    TitleProps
} from "@mantine/core";
import {
    IconArrowDownRight,
    IconArrowUpRight,
    IconFunction,
    IconPlus,
    IconReceipt2,
    IconTrophy
} from "@tabler/icons-react";
import { CampaignsTable, DonatorsTable, YearlyDonationChart } from "../components";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
// import { DashboardLayout } from "../layout";
import GiversLayout from "../layout/GiversLayout";
import { useContext } from "react";
import { AuthContext } from "../context/auth/AuthContext";

const useStyles = createStyles((theme) => ({
    root: {
        padding: `calc(${theme.spacing.xl} * 1.5)`,
    },

    value: {
        fontSize: rem(24),
        fontWeight: 700,
        lineHeight: 1,
    },

    diff: {
        lineHeight: 1,
        display: 'flex',
        alignItems: 'center',
    },

    icon: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
    },

    title: {
        fontWeight: 700,
        textTransform: 'uppercase',
    },
}));



const DashboardPage = () => {

    const { user } = useContext(AuthContext)
    const { classes } = useStyles();

    const paperProps: PaperProps = {
        p: "md",
        shadow: "sm"
    }

    const subTitleProps: TitleProps = {
        size: 18,
        mb: "sm"
    }

    return (
        <GiversLayout>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <Box>
                <Container fluid my="xl">
                    <Stack spacing="xl">
                        <Title order={3}>Hola, {user.name}</Title>
                        <SimpleGrid
                            cols={4}
                            breakpoints={[{ maxWidth: 'md', cols: 2, spacing: 'md' }, {
                                maxWidth: 'sm',
                                cols: 1,
                                spacing: 'sm'
                            }]}
                        >
                            <Paper {...paperProps}>
                                <Group position="apart">
                                    <Text size="xs" color="dimmed" className={classes.title}>
                                        Donaciones Totales
                                    </Text>
                                    <IconReceipt2 className={classes.icon} size="1.4rem" stroke={1.5} />
                                </Group>

                                <Group align="flex-end" spacing="xs" mt={25}>
                                    <Text className={classes.value}>$100,202.10</Text>
                                    {/* eslint-disable-next-line no-constant-condition */}
                                    <Text color={10 > 0 ? 'teal' : 'red'} fz="sm" fw={500} className={classes.diff}>
                                        <span>10%</span>
                                        <IconArrowUpRight size="1rem" stroke={1.5} />
                                    </Text>
                                </Group>

                                <Text fz="xs" c="dimmed" mt={7}>
                                    Comparado con el mes anterior
                                </Text>
                            </Paper>
                            <Paper {...paperProps}>
                                <Group position="apart">
                                    <Text size="xs" color="dimmed" className={classes.title}>
                                        Donaciones Totales
                                    </Text>
                                    <IconReceipt2 className={classes.icon} size="1.4rem" stroke={1.5} />
                                </Group>

                                <Group align="flex-end" spacing="xs" mt={25}>
                                    <Text className={classes.value}>$1,202.10</Text>
                                    {/* eslint-disable-next-line no-constant-condition */}
                                    <Text color={-3 > 0 ? 'teal' : 'red'} fz="sm" fw={500} className={classes.diff}>
                                        <span>30.1%</span>
                                        <IconArrowDownRight size="1rem" stroke={1.5} />
                                    </Text>
                                </Group>

                                <Text fz="xs" c="dimmed" mt={7}>
                                    Comparado con ayer
                                </Text>
                            </Paper>
                            <Paper {...paperProps}>
                                <Group position="apart">
                                    <Text size="xs" color="dimmed" className={classes.title}>
                                        Donaciones promedio por campaña
                                    </Text>
                                    <IconFunction className={classes.icon} size="1.4rem" stroke={1.5} />
                                </Group>

                                <Group align="flex-end" spacing="xs" mt={25}>
                                    <Text className={classes.value}>34%</Text>
                                    {/* eslint-disable-next-line no-constant-condition */}
                                    <Text color={10 > 0 ? 'teal' : 'red'} fz="sm" fw={500} className={classes.diff}>
                                        <span>4.2%</span>
                                        <IconArrowUpRight size="1rem" stroke={1.5} />
                                    </Text>
                                </Group>

                                <Text fz="xs" c="dimmed" mt={7}>
                                    Comparado con el mes anterior
                                </Text>
                            </Paper>
                            <Paper {...paperProps}>
                                <Group position="apart">
                                    <Text size="xs" color="dimmed" className={classes.title}>
                                        Campañas Activas
                                    </Text>
                                    <IconTrophy className={classes.icon} size="1.4rem" stroke={1.5} />
                                </Group>

                                <Group align="flex-end" spacing="xs" mt={25}>
                                    <Text className={classes.value}>13</Text>
                                    {/* eslint-disable-next-line no-constant-condition */}
                                    <Text color={10 > 0 ? 'teal' : 'red'} fz="sm" fw={500} className={classes.diff}>
                                        <span>11.1%</span>
                                        <IconArrowUpRight size="1rem" stroke={1.5} />
                                    </Text>
                                </Group>

                                <Text fz="xs" c="dimmed" mt={7}>
                                    Comparado con el mes anterior
                                </Text>
                            </Paper>
                        </SimpleGrid>

                        {/* Campaigns Table */}
                        <Paper {...paperProps}>
                            <Card.Section mb="lg">
                                <Flex align="center" justify="space-between">
                                    <Box>
                                        <Title {...subTitleProps}>Campañas</Title>
                                        <Text size="sm">Gestiona tus campañas</Text>
                                    </Box>
                                    <Button
                                        leftIcon={<IconPlus size={18} />}
                                        component={Link}
                                        to="/panel/create-campaign"
                                    >
                                        Crear una campaña
                                    </Button>
                                </Flex>
                            </Card.Section>
                            <Card.Section>
                                <CampaignsTable />
                            </Card.Section>
                        </Paper>

                        {/* Foundations Table */}
                        <Paper {...paperProps}>
                            <Card.Section mb="lg">
                                <Flex align="center" justify="space-between">
                                    <Box>
                                        <Title {...subTitleProps}>Fundaciones</Title>
                                        <Text size="sm">Gestiona tus fundaciones</Text>
                                    </Box>
                                    <Button
                                        leftIcon={<IconPlus size={18} />}
                                        component={Link}
                                        to="/panel/create-foundation"
                                    >
                                        Crear una fundación
                                    </Button>
                                </Flex>
                            </Card.Section>
                            <Card.Section>
                                <CampaignsTable />
                            </Card.Section>
                        </Paper>

                        {/* Donators Table */}
                        <Paper {...paperProps}>
                            <Card.Section>
                                <Title {...subTitleProps}>Top Colaboradores</Title>
                                <DonatorsTable />
                            </Card.Section>
                            <Card.Section></Card.Section>
                        </Paper>

                        {/* Yearly Donation Chart */}
                        {/* <Paper {...paperProps}>
                            <Title {...subTitleProps}>Donaciones por categoría</Title>
                            <YearlyDonationChart />
                        </Paper> */}
                    </Stack>
                </Container>
            </Box>
        </GiversLayout>
    );
};

export default DashboardPage;

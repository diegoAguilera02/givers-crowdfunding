import { AppShell, useMantineTheme } from '@mantine/core';
import AppNavbarGuest from '../components/navbar/AppNavbarGuest';

const GiversLayoutGuest = ({ children }) => {
    const theme = useMantineTheme();

    return (
        <>
            <AppShell
                styles={{
                    main: {
                        background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
                    },
                }}
                navbarOffsetBreakpoint="sm"
                asideOffsetBreakpoint="sm"
                navbar={<></>}
                header={<AppNavbarGuest />}
            >
                {children}
            </AppShell>
        </>
    );
}

export default GiversLayoutGuest;

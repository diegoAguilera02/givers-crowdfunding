import { Helmet } from "react-helmet";
import {
    ActionIcon,
    Alert,
    Anchor,
    Box,
    Button,
    Card,
    Checkbox,
    Container,
    Flex,
    Group,
    NumberInput,
    Paper,
    PaperProps,
    Radio,
    SegmentedControl,
    Select,
    SimpleGrid,
    Stack,
    Stepper,
    Text,
    TextInput,
    Title,
    TitleProps,
    useMantineTheme
} from "@mantine/core";
import { Link, RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import React, { forwardRef, useState } from "react";
import { DateInput } from "@mantine/dates";
import {
    IconBrandApple,
    IconBrandFacebook,
    IconBrandGoogle,
    IconBrandLinkedin,
    IconBrandPaypal,
    IconBrandTwitter,
    IconBrandWhatsapp,
    IconBrandYoutube,
    IconCalendar,
    IconCheck,
    IconChevronLeft,
    IconChevronRight,
    IconCurrency,
    IconCurrencyDollar,
    IconInfoCircleFilled,
    IconLink,
    IconMail,
    IconPlus,
    IconTrash
} from "@tabler/icons-react";
import { CategorySelect, CountrySelect, CurrencySelect, FileDropzone } from "../components";
import { randomId } from "@mantine/hooks";
import { useForm } from "@mantine/form";

import { Link as LinkRouter } from "react-router-dom";

interface ISocialProps {
    icon: React.FC<any>;
    title: React.ReactNode;
}

const CreateFoundationPage = () => {

    const [formValues, setFormValues] = useState<{ name: string; city: string, address: string, confidenceLevel: number, fono: string, responsible: string }>({
        name: '',
        city: '',
        address: '',
        confidenceLevel: 0,
        fono: '',
        responsible: '',
    });

    const [countrySelect, setCountrySelect] = useState<string>('');



    const theme = useMantineTheme()
    const [active, setActive] = useState(0);
    const [target, setTarget] = useState('deadline');
    const [deadlineDate, setDeadlineDate] = useState<Date | null>(null);
    const [donationType, setDonationType] = useState('any');
    const [minimumCheck, setMinimumCheck] = useState(false);


    const nextStep = () => setActive((current: number) => (current < 4 ? current + 1 : current));
    const prevStep = () => setActive((current: number) => (current > 0 ? current - 1 : current));


    const titleProps: TitleProps = {
        size: 24,
        mb: "md"
    }

    const subTitleProps: TitleProps = {
        size: 18,
        mb: "sm"
    }

    const paperProps: PaperProps = {
        p: "md",
        withBorder: false,
        shadow: 'sm',
        mb: "md",
        sx: { backgroundColor: theme.white }
    }

    const handleSelectCountry = (name: string) => {
        setCountrySelect(name);
    }

    return (
        <>
            <Helmet>
                <title>Crear Fundación</title>
            </Helmet>
            <Box>
                <Container my={36}>
                    <Title mb="xl" align="center">Crea una fundación</Title>

                    <div>
                        <Title {...titleProps}>Información Fundación</Title>
                        <Paper {...paperProps}>
                            <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                                <TextInput label="Titulo" />
                                <CategorySelect />
                            </SimpleGrid>
                        </Paper>
                        <Paper {...paperProps}>
                            <Title {...subTitleProps}>Campaign location</Title>
                            <Text size="sm" mb="sm">Please select the country that we&apos;ll be sending funds to
                                (typically where you&apos;re resident). This helps match you to the correct payment
                                processors.</Text>
                            <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                                <CountrySelect handleSelectCountry={handleSelectCountry} />
                                <TextInput label="Ciudad" placeholder="city" />
                            </SimpleGrid>
                        </Paper>
                        {/* <Paper {...paperProps}>
                            <Stack spacing="sm">
                                <Title {...subTitleProps}>Información de Donación</Title>
                                <CurrencySelect />
                                <Radio.Group
                                    label="What kind of fundraiser would you like to create?"
                                    value={target}
                                    onChange={setTarget}
                                >
                                    <Group mt="xs">
                                        <Radio value="deadline" label="Fundraiser with a specific end date?" />
                                        <Radio value="no-deadline" label="Ongoing (no deadline) fundraiser?" />
                                    </Group>
                                </Radio.Group>
                                <Paper {...paperProps}>
                                    {target === 'deadline' ?
                                        <Stack spacing="xs">
                                            <Text size="sm">Fundraiser with a specific end date?</Text>
                                            <Text size="sm">This creates urgency and should always be used when
                                                money is needed before a certain time.</Text>
                                            <DateInput
                                                value={deadlineDate}
                                                onChange={setDeadlineDate}
                                                label="Deadline"
                                                placeholder="Date input"
                                                icon={<IconCalendar size={18} />}
                                            />
                                            <NumberInput
                                                label="Target amount"
                                                icon={<IconCurrencyDollar size={18} />} />
                                            <Checkbox
                                                label="Allow your fundraiser to be funded over the needed amount?" />
                                        </Stack> :
                                        <Stack spacing="xs">
                                            <Text size="sm">Ongoing (no deadline) fundraiser?</Text>
                                            <Text size="sm">This should be used if you are collecting money on a
                                                regular
                                                basis.</Text>
                                            <Checkbox
                                                checked={minimumCheck}
                                                onChange={(event) => setMinimumCheck(event.currentTarget.checked)}
                                                label="Select this if you would like to set a specific a minimum financial target" />
                                            {minimumCheck &&
                                                <NumberInput
                                                    label="Target amount"
                                                    icon={<IconCurrencyDollar size={18} />}
                                                />}
                                        </Stack>}
                                </Paper>
                            </Stack>
                        </Paper> */}
                        {/* <Paper {...paperProps}>
                            <Title {...subTitleProps}>Tipo de donación</Title>
                            <SegmentedControl
                                size="md"
                                value={donationType}
                                onChange={setDonationType}
                                data={[
                                    { label: 'Any (popular option)', value: 'any' },
                                    { label: 'Minimum', value: 'minimum' },
                                    { label: 'Fixed', value: 'fixed' },
                                ]}
                                mb="sm"
                            />
                            {donationType === 'minimum' ?
                                <NumberInput label="Minimum amount(s)" /> :
                                <NumberInput label="Fixed amount(s)" />}
                            <Checkbox
                                label="Would you like your fundraising page shown in more than one language?"
                                mt="sm"
                            />
                        </Paper> */}
                        {/* <Paper {...paperProps}>
                            <Stack spacing="sm">
                                <Title {...subTitleProps}>Fund & Registration details</Title>
                                <Text size="sm">*Name of the person receiving funds. For organizations, the legal
                                    representative
                                    name (this can be amended later).</Text>
                                <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                                    <TextInput label="First name" />
                                    <TextInput label="Last name" />
                                </SimpleGrid>
                                <FileDropzone
                                    label="Upload your profile picture"
                                    description="This picture will be shown next to your name"
                                />
                                <Checkbox label={
                                    <>
                                        I agree to the Givers{' '}
                                        <Anchor href="#" target="_blank">
                                            terms and conditions & privacy policy
                                        </Anchor>
                                    </>
                                } />
                            </Stack>
                        </Paper> */}

                        <Card.Section mb="lg">
                            <Flex align="center" justify="center">
                                <Button
                                    // leftIcon={<IconPlus size={18} />}
                                    component={LinkRouter}
                                    to="/panel/dashboard"
                                    style={{ marginRight: 20 }}
                                >
                                    Volver
                                </Button>

                                <Button
                                    leftIcon={<IconPlus size={18} />}
                                    component={LinkRouter}
                                    onClick={() => console.log('press')}
                                >
                                    Crear una fundación
                                </Button>
                            </Flex>
                        </Card.Section>
                    </div>
                </Container>
            </Box>
        </>
    );
};

export default CreateFoundationPage;

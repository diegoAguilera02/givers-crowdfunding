import { Helmet } from "react-helmet";
import {
    // ActionIcon,
    // Alert,
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
    SimpleGrid,
    Stack,
    Text,
    TextInput,
    Title,
    TitleProps,
    useMantineTheme
} from "@mantine/core";
import { Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import React, { forwardRef, useState } from "react";
import { DateInput } from "@mantine/dates";
import { CategorySelect, CurrencySelect, FileDropzone } from "../components";

import { Link as LinkRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FoundationSelect from "../components/FoundationSelect";

import * as yup from 'yup';
import { IconCalendar, IconCurrencyDollar } from "@tabler/icons-react";

const validationCampaignSchema = yup.object().shape({
    name: yup.string().required('El nombre de la campaña es requerido'),
    description: yup.string().required('La descripción de la campaña es requerida'),
    category: yup.string().required('La categoría de la campaña es requerida'),
    foundation: yup.string().required('La fundación de la campaña es requerida'),
    initDate: yup.string().required('La fecha de inicio de la campaña es requerida'),
    finishDate: yup.string().required('La fecha de finalización de la campaña es requerida'),
    isCause: yup.boolean().required('El tipo de campaña es requerido'),
    isExperience: yup.boolean().required('El tipo de campaña es requerido'),
    requestAmount: yup.number().required('El monto de la campaña es requerido'),
});

const CreateCampaignPage = () => {

    const navigate = useNavigate();

    const [formValues, setFormValues] = useState<{ name: string; description: string; requestAmount: number; category: string; foundation: string; initDate: Date; finishDate: Date; isCause: boolean; isExperience: boolean }>({
        name: '',
        description: '',
        category: '',
        foundation: '',
        initDate: null,
        finishDate: null,
        isCause: false,
        isExperience: false,
        requestAmount: 0,
    });

    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
    const [error, setError] = useState<string | null>(null);


    const theme = useMantineTheme()
    const [active, setActive] = useState(0);
    const [target, setTarget] = useState('deadline');
    const [deadlineDate, setDeadlineDate] = useState<Date | null>(null);
    const [donationType, setDonationType] = useState('any');
    const [minimumCheck, setMinimumCheck] = useState(false);

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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    }

    const onCreateCampaign = async () => {

        const isValid = await isValidForm();

        if (isValid) {
            // Format data
            const campaignData = {
            }

            // const response = await addFoundation(foundationData);
            console.log(response);
            if (!response.success) return setError('ocurrió un error al crear la fundación');

            // Redirect to dashboard
            navigate('/panel/dashboard');

        }
    }

    const isValidForm = async (): Promise<boolean> => {
        try {
            await validationCampaignSchema.validate(formValues, { abortEarly: false });
            return true;
        } catch (error) {
            const errors: Record<string, string> = {};
            error.inner.forEach((err) => {
                errors[err.path] = err.message;
            });
            setErrorMessages(errors);
            return false;
        }
    }

    return (
        <>
            <Helmet>
                <title>Crear Campaña</title>
            </Helmet>
            <Box>
                <Container my={36}>
                    <Title mb="xl" align="center">Crea tu campaña</Title>

                    <div>
                        <Title {...titleProps}>Información Campaña</Title>
                        <Paper {...paperProps}>
                            <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                                <TextInput label="Nombre" />
                                <TextInput label="Descripción" />
                                <CategorySelect />
                                <FoundationSelect />
                            </SimpleGrid>
                        </Paper>

                        <Paper {...paperProps}>
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
                                    <Stack spacing="xs">
                                        <Text size="sm">Fundraiser with a specific end date?</Text>
                                        <Text size="sm">This creates urgency and should always be used when
                                            money is needed before a certain time.</Text>
                                        <DateInput
                                            name="initDate"
                                            value={formValues.initDate}
                                            onChange={(value) => setFormValues({ ...formValues, initDate: value })}
                                            label="Fecha inicial campaña"
                                            placeholder="Fecha inicial"
                                            lang="es"
                                            icon={<IconCalendar size={18} />}
                                        />

                                        <DateInput
                                            value={deadlineDate}
                                            onChange={(value) => setFormValues({ ...formValues, finishDate: value })}
                                            label="Fecha final campaña"
                                            placeholder="Fecha final"
                                            lang="es"
                                            icon={<IconCalendar size={18} />}
                                        />

                                        <NumberInput
                                            label="Monto a recaudar"
                                            icon={<IconCurrencyDollar size={18} />} />
                                        <Checkbox
                                            label="Allow your fundraiser to be funded over the needed amount?" />
                                    </Stack>
                                </Paper>
                            </Stack>
                        </Paper>
                        <Paper {...paperProps}>
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
                        </Paper>
                        <Paper {...paperProps}>
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
                        </Paper>

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
                                    to=""
                                    // leftIcon={<IconPlus size={18} />}
                                    component={LinkRouter}
                                    onClick={() => console.log('press')}
                                >
                                    Crear una campaña
                                </Button>
                            </Flex>
                        </Card.Section>
                    </div>
                </Container>
            </Box>
        </>
    );
};

export default CreateCampaignPage;

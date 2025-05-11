'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginSchema } from '@/schemas/auth';
import {
    Container,
    FormWrapper,
    Title,
    Field,
    Label,
    Input,
    ErrorMessage,
    SubmitButton,
    Left,
    Right,
    Subtitle,
    Text
} from './styles';
import Image from 'next/image';

export default function Login() {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginSchema) => {
        try {
            setErrorMessage(null);

            const success = data.username === 'admin' && data.password === '123456';

            if (!success) {
                throw new Error('Username or password is incorrect');
            }

            document.cookie = 'logged=1; path=/; max-age=86400';
            router.push('/dashboard');
        } catch (err: unknown) {
            if (err instanceof Error) {
                setErrorMessage(err.message);
            } else {
                setErrorMessage('An unexpected error occurred');
            }
        }
    };

    return (
        <Container>
            <Left>
                <Image
                    src="/login-art.png"
                    alt="Illustration of a finance dashboard"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                />
            </Left>

            <Right>
                <FormWrapper onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Title>Welcome Back!</Title>
                        <Subtitle>Please enter your details to sign in</Subtitle>
                    </div>

                    <Field>
                        <Label htmlFor="username">
                            Username
                            {errors.username && (
                                <ErrorMessage>{errors.username.message}</ErrorMessage>
                            )}
                        </Label>
                        <Input
                            id="username"
                            placeholder="Type your username"
                            type="text"
                            data-error={!!errors.username}
                            {...register('username')}
                        />
                    </Field>

                    <Field>
                        <Label htmlFor="password">
                            Password
                            {errors.password && (
                                <ErrorMessage>{errors.password.message}</ErrorMessage>
                            )}
                        </Label>
                        <Input
                            id="password"
                            placeholder="••••••••••••••"
                            type="password"
                            data-error={!!errors.password}
                            {...register('password')}
                        />
                    </Field>

                    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

                    <SubmitButton type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Logging...' : 'Login'}
                    </SubmitButton>

                    <Text>To access the dashboard use the login &quot;admin&quot; and password &quot;123456&quot;</Text>
                </FormWrapper>
            </Right>
        </Container>
    );
}

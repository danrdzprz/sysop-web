
import { InputsTextArea } from '#build/components';
<template>
    <VRow justify="center" align="center">
        <VCol cols="12" sm="12"  md="6" lg="6">
            <InputsTextField
                label="Título"
                class="shrink"
                name="title"
            >
            </InputsTextField>
        </VCol>
    </VRow>
    <VRow justify="center" align="center">
        <VCol cols="12" sm="12"  md="6" lg="6">
            <InputsTextArea
                label="Texto"
                class="shrink"
                name="text"
            >
            </InputsTextArea>
        </VCol>
    </VRow>
</template>
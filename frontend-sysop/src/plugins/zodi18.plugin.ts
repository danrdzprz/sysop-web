import { z } from "zod";
import { zodI18nMap } from "~/utils/zodI18nMap";
import type { Composer } from "@nuxtjs/i18n/dist/runtime/composables";

export default defineNuxtPlugin((nuxtApp) => {
    const i18n = nuxtApp.$i18n as Composer;
    z.setErrorMap(zodI18nMap(i18n.t));
});
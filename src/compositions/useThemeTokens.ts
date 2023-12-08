import { reactive, watch, readonly } from 'vue'
import { useColorTheme } from '@/compositions/useColorTheme'

type ThemeTokens = ReturnType<typeof getTokens>

function factory(): () => Readonly<ThemeTokens> {
  const { value: theme } = useColorTheme()

  const tokens = reactive({}) as ThemeTokens

  setTokens()

  watch(theme, () => setTokens())

  function setTokens(): void {
    requestAnimationFrame(() => {
      Object.assign(tokens, getTokens())
    })
  }

  function useThemeTokens(): Readonly<ThemeTokens> {
    return readonly(tokens)
  }

  return useThemeTokens
}

export const useThemeTokens = factory()

// this makes more sense to just infer the return type
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function getTokens() {
  const style = getComputedStyle(document.documentElement)

  return {
    colorBackgroundCode: style.getPropertyValue('--p-color-bg-code'),
    colorBackgroundFloating: style.getPropertyValue('--p-color-bg-floating'),
    colorBackgroundFloatingSticky: style.getPropertyValue('--p-color-bg-floating-sticky'),
    colorBackgroundOne: style.getPropertyValue('--p-color-bg-1'),
    colorBackgroundOverlay: style.getPropertyValue('--p-color-bg-overlay'),
    colorBackgroundTwo: style.getPropertyValue('--p-color-bg-2'),
    colorBackgroundZero: style.getPropertyValue('--p-color-bg-0'),
    colorButtonDangerBg: style.getPropertyValue('--p-color-button-danger-bg'),
    colorButtonDangerBgActive: style.getPropertyValue('--p-color-button-danger-bg-active'),
    colorButtonDangerBgHover: style.getPropertyValue('--p-color-button-danger-bg-hover'),
    colorButtonDangerBorder: style.getPropertyValue('--p-color-button-danger-border'),
    colorButtonDangerBorderActive: style.getPropertyValue('--p-color-button-danger-border-active'),
    colorButtonDangerBorderHover: style.getPropertyValue('--p-color-button-danger-border-hover'),
    colorButtonDangerText: style.getPropertyValue('--p-color-button-danger-text'),
    colorButtonDangerTextActive: style.getPropertyValue('--p-color-button-danger-text-active'),
    colorButtonDangerTextHover: style.getPropertyValue('--p-color-button-danger-text-hover'),
    colorButtonDefaultBg: style.getPropertyValue('--p-color-button-default-bg'),
    colorButtonDefaultBgActive: style.getPropertyValue('--p-color-button-default-bg-active'),
    colorButtonDefaultBgHover: style.getPropertyValue('--p-color-button-default-bg-hover'),
    colorButtonDefaultBorder: style.getPropertyValue('--p-color-button-default-border'),
    colorButtonDefaultBorderActive: style.getPropertyValue('--p-color-button-default-border-active'),
    colorButtonDefaultBorderHover: style.getPropertyValue('--p-color-button-default-border-hover'),
    colorButtonDefaultText: style.getPropertyValue('--p-color-button-default-text'),
    colorButtonDefaultTextActive: style.getPropertyValue('--p-color-button-default-text-active'),
    colorButtonDefaultTextHover: style.getPropertyValue('--p-color-button-default-text-hover'),
    colorButtonFlatBg: style.getPropertyValue('--p-color-button-flat-bg'),
    colorButtonFlatBgActive: style.getPropertyValue('--p-color-button-flat-bg-active'),
    colorButtonFlatBgHover: style.getPropertyValue('--p-color-button-flat-bg-hover'),
    colorButtonFlatBorder: style.getPropertyValue('--p-color-button-flat-border'),
    colorButtonFlatBorderActive: style.getPropertyValue('--p-color-button-flat-border-active'),
    colorButtonFlatBorderHover: style.getPropertyValue('--p-color-button-flat-border-hover'),
    colorButtonFlatDangerBg: style.getPropertyValue('--p-color-button-flat-danger-bg'),
    colorButtonFlatDangerBgActive: style.getPropertyValue('--p-color-button-flat-danger-bg-active'),
    colorButtonFlatDangerBgHover: style.getPropertyValue('--p-color-button-flat-danger-bg-hover'),
    colorButtonFlatDangerBorder: style.getPropertyValue('--p-color-button-flat-danger-border'),
    colorButtonFlatDangerBorderActive: style.getPropertyValue('--p-color-button-flat-danger-border-active'),
    colorButtonFlatDangerBorderHover: style.getPropertyValue('--p-color-button-flat-danger-border-hover'),
    colorButtonFlatDangerText: style.getPropertyValue('--p-color-button-flat-danger-text'),
    colorButtonFlatDangerTextActive: style.getPropertyValue('--p-color-button-flat-danger-text-active'),
    colorButtonFlatDangerTextHover: style.getPropertyValue('--p-color-button-flat-danger-text-hover'),
    colorButtonFlatText: style.getPropertyValue('--p-color-button-flat-text'),
    colorButtonFlatTextActive: style.getPropertyValue('--p-color-button-flat-text-active'),
    colorButtonFlatTextHover: style.getPropertyValue('--p-color-button-flat-text-hover'),
    colorButtonPrimaryBg: style.getPropertyValue('--p-color-button-primary-bg'),
    colorButtonPrimaryBgActive: style.getPropertyValue('--p-color-button-primary-bg-active'),
    colorButtonPrimaryBgHover: style.getPropertyValue('--p-color-button-primary-bg-hover'),
    colorButtonPrimaryBorder: style.getPropertyValue('--p-color-button-primary-border'),
    colorButtonPrimaryBorderActive: style.getPropertyValue('--p-color-button-primary-border-active'),
    colorButtonPrimaryBorderHover: style.getPropertyValue('--p-color-button-primary-border-hover'),
    colorButtonPrimaryDangerBg: style.getPropertyValue('--p-color-button-primary-danger-bg'),
    colorButtonPrimaryDangerBgActive: style.getPropertyValue('--p-color-button-primary-danger-bg-active'),
    colorButtonPrimaryDangerBgHover: style.getPropertyValue('--p-color-button-primary-danger-bg-hover'),
    colorButtonPrimaryDangerBorder: style.getPropertyValue('--p-color-button-primary-danger-border'),
    colorButtonPrimaryDangerBorderActive: style.getPropertyValue('--p-color-button-primary-danger-border-active'),
    colorButtonPrimaryDangerBorderHover: style.getPropertyValue('--p-color-button-primary-danger-border-hover'),
    colorButtonPrimaryDangerText: style.getPropertyValue('--p-color-button-primary-danger-text'),
    colorButtonPrimaryDangerTextActive: style.getPropertyValue('--p-color-button-primary-danger-text-active'),
    colorButtonPrimaryDangerTextHover: style.getPropertyValue('--p-color-button-primary-danger-text-hover'),
    colorButtonPrimaryText: style.getPropertyValue('--p-color-button-primary-text'),
    colorButtonPrimaryTextActive: style.getPropertyValue('--p-color-button-primary-text-active'),
    colorButtonPrimaryTextHover: style.getPropertyValue('--p-color-button-primary-text-hover'),
    colorButtonSelectedBg: style.getPropertyValue('--p-color-button-selected-bg'),
    colorButtonSelectedBorder: style.getPropertyValue('--p-color-button-selected-border'),
    colorButtonSelectedText: style.getPropertyValue('--p-color-button-selected-text'),
    colorDivider: style.getPropertyValue('--p-color-divider'),
    colorFocusRing: style.getPropertyValue('--p-color-focus-ring'),
    colorFocusRingOffset: style.getPropertyValue('--p-color-focus-ring-offset'),
    colorInputBg: style.getPropertyValue('--p-color-input-bg'),
    colorInputBgFocus: style.getPropertyValue('--p-color-input-bg-focus'),
    colorInputBgInvalid: style.getPropertyValue('--p-color-input-bg-invalid'),
    colorInputBorder: style.getPropertyValue('--p-color-input-border'),
    colorInputBorderFocus: style.getPropertyValue('--p-color-input-border-focus'),
    colorInputBorderInvalid: style.getPropertyValue('--p-color-input-border-invalid'),
    colorInputCheckedBg: style.getPropertyValue('--p-color-input-checked-bg'),
    colorInputCheckedBorder: style.getPropertyValue('--p-color-input-checked-border'),
    colorInputCheckedText: style.getPropertyValue('--p-color-input-checked-text'),
    colorInputPlaceholder: style.getPropertyValue('--p-color-input-placeholder'),
    colorInputText: style.getPropertyValue('--p-color-input-text'),
    colorInputTextInvalidIcon: style.getPropertyValue('--p-color-input-text-invalid-icon'),
    colorLive: style.getPropertyValue('--p-color-live'),
    colorMessageErrorBg: style.getPropertyValue('--p-color-message-error-bg'),
    colorMessageErrorText: style.getPropertyValue('--p-color-message-error-text'),
    colorMessageInfoBg: style.getPropertyValue('--p-color-message-info-bg'),
    colorMessageInfoText: style.getPropertyValue('--p-color-message-info-text'),
    colorMessageSuccessBg: style.getPropertyValue('--p-color-message-success-bg'),
    colorMessageSuccessText: style.getPropertyValue('--p-color-message-success-text'),
    colorMessageWarningBg: style.getPropertyValue('--p-color-message-warning-bg'),
    colorMessageWarningText: style.getPropertyValue('--p-color-message-warning-text'),
    colorSelectableHover: style.getPropertyValue('--p-color-selectable-hover'),
    colorSelected: style.getPropertyValue('--p-color-selected'),
    colorSelectionHighlight: style.getPropertyValue('--p-color-selection-highlight'),
    colorSentimentNegative: style.getPropertyValue('--p-color-sentiment-negative'),
    colorSentimentNegativeHslValues: style.getPropertyValue('--p-color-sentiment-negative-hsl-values'),
    colorSentimentNegativeHue: style.getPropertyValue('--p-color-sentiment-negative-hue'),
    colorSentimentNegativeLightness: style.getPropertyValue('--p-color-sentiment-negative-lightness'),
    colorSentimentNegativeSaturation: style.getPropertyValue('--p-color-sentiment-negative-saturation'),
    colorSentimentNeutral: style.getPropertyValue('--p-color-sentiment-neutral'),
    colorSentimentNeutralHslValues: style.getPropertyValue('--p-color-sentiment-neutral-hsl-values'),
    colorSentimentNeutralHue: style.getPropertyValue('--p-color-sentiment-neutral-hue'),
    colorSentimentNeutralLightness: style.getPropertyValue('--p-color-sentiment-neutral-lightness'),
    colorSentimentNeutralSaturation: style.getPropertyValue('--p-color-sentiment-neutral-saturation'),
    colorSentimentPositive: style.getPropertyValue('--p-color-sentiment-positive'),
    colorSentimentPositiveHslValues: style.getPropertyValue('--p-color-sentiment-positive-hsl-values'),
    colorSentimentPositiveHue: style.getPropertyValue('--p-color-sentiment-positive-hue'),
    colorSentimentPositiveLightness: style.getPropertyValue('--p-color-sentiment-positive-lightness'),
    colorSentimentPositiveSaturation: style.getPropertyValue('--p-color-sentiment-positive-saturation'),
    colorSentimentWarning: style.getPropertyValue('--p-color-sentiment-warning'),
    colorSentimentWarningHslValues: style.getPropertyValue('--p-color-sentiment-warning-hsl-values'),
    colorSentimentWarningHue: style.getPropertyValue('--p-color-sentiment-warning-hue'),
    colorSentimentWarningLightness: style.getPropertyValue('--p-color-sentiment-warning-lightness'),
    colorSentimentWarningSaturation: style.getPropertyValue('--p-color-sentiment-warning-saturation'),
    colorSyntaxAttribute: style.getPropertyValue('--p-color-syntax-attribute'),
    colorSyntaxComment: style.getPropertyValue('--p-color-syntax-comment'),
    colorSyntaxKeyword: style.getPropertyValue('--p-color-syntax-keyword'),
    colorSyntaxParameter: style.getPropertyValue('--p-color-syntax-parameter'),
    colorSyntaxSelector: style.getPropertyValue('--p-color-syntax-selector'),
    colorSyntaxSymbol: style.getPropertyValue('--p-color-syntax-symbol'),
    colorSyntaxTitle: style.getPropertyValue('--p-color-syntax-title'),
    colorTagBg: style.getPropertyValue('--p-color-tag-bg'),
    colorTagBorder: style.getPropertyValue('--p-color-tag-border'),
    colorTagText: style.getPropertyValue('--p-color-tag-text'),
    colorTextCode: style.getPropertyValue('--p-color-text-code'),
    colorTextDefault: style.getPropertyValue('--p-color-text-default'),
    colorTextInvalid: style.getPropertyValue('--p-color-text-invalid'),
    colorTextInverse: style.getPropertyValue('--p-color-text-inverse'),
    colorTextLink: style.getPropertyValue('--p-color-text-link'),
    colorTextSelected: style.getPropertyValue('--p-color-text-selected'),
    colorTextSubdued: style.getPropertyValue('--p-color-text-subdued'),
    colorToggleBg: style.getPropertyValue('--p-color-toggle-bg'),
    colorToggleBgChecked: style.getPropertyValue('--p-color-toggle-bg-checked'),
    colorToggleTrigger: style.getPropertyValue('--p-color-toggle-trigger'),
  }
}
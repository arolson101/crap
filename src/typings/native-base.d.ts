declare module 'native-base/dist/src/theme/variables/platform' {
  type Color = string

  interface Platform {
    headerStyle: Color,
    iconStyle: Color,
    contentStyle: Color,
    expandedIconStyle: Color,

    androidRipple: boolean,
    androidRippleColor: Color,
    androidRippleColorDark: Color,
    btnUppercaseAndroidText: boolean,

    badgeBg: Color,
    badgeColor: Color,
    badgePadding: number,
    btnFontFamily: string,
    btnDisabledBg: Color,
    buttonPadding: number,

    btnPrimaryBg: Color,
    btnPrimaryColor: Color,
    btnInfoBg: Color,
    btnInfoColor: Color,
    btnSuccessBg: Color,
    btnSuccessColor: Color,
    btnDangerBg: Color,
    btnDangerColor: Color,
    btnWarningBg: Color,
    btnWarningColor: Color,
    btnTextSize: number,
    btnTextSizeLarge: number,
    btnTextSizeSmall: number,
    borderRadiusLarge: number,
    iconSizeLarge: number,
    iconSizeSmall: number,

    cardDefaultBg: Color,
    cardBorderColor: Color,

    CheckboxRadius: number,
    CheckboxBorderWidth: number,
    CheckboxPaddingLeft: number,
    CheckboxPaddingBottom: number,
    CheckboxIconSize: number,
    CheckboxIconMarginTop: number,
    CheckboxFontSize: number,
    checkboxBgColor: Color,
    checkboxSize: number,
    checkboxTickColor: Color,

    brandPrimary: Color,
    brandInfo: Color,
    brandSuccess: Color,
    brandDanger: Color,
    brandWarning: Color,
    brandDark: Color,
    brandLight: Color,

    datePickerTextColor: Color,
    datePickerBg: Color,

    DefaultFontSize: number,
    fontFamily: string,
    fontSizeBase: number,
    fontSizeH1: number,
    fontSizeH2: number,
    fontSizeH3: number,

    footerHeight: number,
    footerDefaultBg: Color,
    footerPaddingBottom: number,

    tabBarTextColor: Color,
    tabBarTextSize: number,
    activeTab: Color,
    sTabBarActiveTextColor: Color,
    tabBarActiveTextColor: Color,
    tabActiveBgColor: Color,

    toolbarBtnColor: Color,
    toolbarDefaultBg: Color,
    toolbarHeight: number,
    toolbarSearchIconSize: number,
    toolbarInputColor: Color,
    searchBarHeight: number,
    searchBarInputHeight: number,
    toolbarBtnTextColor: Color,
    toolbarDefaultBorder: Color,
    iosStatusbar: 'dark-content' | 'light-content',
    statusBarColor: Color,
    darkenHeader: Color,

    iconFamily: string,
    iconFontSize: number,
    iconHeaderSize: number,

    inputFontSize: number,
    inputBorderColor: Color,
    inputSuccessBorderColor: Color,
    inputErrorBorderColor: Color,
    inputHeightBase: number,
    inputColor: Color,
    inputColorPlaceholder: Color,

    btnLineHeight: number,
    lineHeightH1: number,
    lineHeightH2: number,
    lineHeightH3: number,
    lineHeight: number,
    listItemSelected: Color,

    listBg: Color,
    listBorderColor: Color,
    listDividerBg: Color,
    listBtnUnderlayColor: Color,
    listItemPadding: number,
    listNoteColor: Color,
    listNoteSize: number,

    defaultProgressColor: Color,
    inverseProgressColor: Color,

    radioBtnSize: number,
    radioSelectedColorAndroid: Color,
    radioBtnLineHeight: number,
    radioColor: Color

    segmentBackgroundColor: Color,
    segmentActiveBackgroundColor: Color,
    segmentTextColor: Color,
    segmentActiveTextColor: Color,
    segmentBorderColor: Color,
    segmentBorderColorMain: Color,

    defaultSpinnerColor: Color,
    inverseSpinnerColor: Color,

    tabDefaultBg: Color,
    topTabBarTextColor: Color,
    topTabBarActiveTextColor: Color,
    topTabBarBorderColor: Color,
    topTabBarActiveBorderColor: Color,

    tabBgColor: Color,
    tabFontSize: number,

    textColor: Color,
    inverseTextColor: Color,
    noteFontSize: number,
    defaultTextColor: Color

    titleFontfamily: string,
    titleFontSize: number,
    subTitleFontSize: number,
    subtitleColor: Color,
    titleFontColor: Color,

    borderRadiusBase: number,
    borderWidth: number,
    contentPadding: number,
    dropdownLinkColor: Color,
    inputLineHeight: number,
    deviceWidth: number,
    deviceHeight: number,
    isIphoneX: boolean,
    inputGroupRoundedBorderRadius: number,
  }
  const platform: Platform
  export default platform
}

import React from 'react';
import { Content } from './styled';
import THEME from '../../theme';

export default function Text({ text, color, marginBottom , marginTop, fontWeight, textAlign, width }) {
  return (
    <Content
      style={{
        color: color || THEME.COLORS.WHITE,
        marginBottom: marginBottom || 0,
        marginTop: marginTop || 0,
        fontWeight: fontWeight || 400,
        textAlign: textAlign || "auto",
        width: width || "auto"
      }}
    >
      {text}
    </Content>
  )
}

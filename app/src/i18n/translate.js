import React from 'react'
import {FormattedMessage, FormattedDisplayName} from  'react-intl'



const translate = (id, value={}) => <FormattedMessage id={id} values={{...value}} />;

// const tr2 = (id, value={}) => <FormattedDisplayName />

export default translate;
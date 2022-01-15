import React, {useState} from 'react';
import {Button, ImageList, IconButton, Box, Typography} from '@mui/material';
import {Helper} from '../libs/Helper';
import {Colors} from '../themes';
import {API} from '../libs/api';
import DeleteIcon from '@mui/icons-material/Delete';
import Image from 'next/image';
import Loader from './Loader';

const IMG_SIZE = 100;

export default function Attachment(props) {
  const {title = null, data = [], isMultiple = true, showAdd = true, onSelect, onDelete, sx} = props;

  const [loading, setLoading] = useState(false);

  const _onSelectFile = (event) => {
    const files = event?.target?.files ?? [];
    if (files.length > 0) {
      setLoading(true);
      const arrayAttachment = [];
      for (let index = 0; index < files.length; index++) {
        const item = files[index];
        const body = new FormData();
        body.append('file', item);
        API.singleRequest(API.addAttachment(body))
            .then((response) => {
              arrayAttachment.push(response.data.url);
              if (index === files.length - 1) {
                onSelect(arrayAttachment);
              }
            })
            .catch(() => setLoading(false))
            .finally(() => setLoading(false));
      }
    }
  };

  function _onDeleteFile(item) {
    const arrayAttachment = [...data];
    const index = arrayAttachment.findIndex((e) => e === item);
    arrayAttachment.splice(index, 1);
    onDelete(arrayAttachment);
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      ...sx,
    }}>
      {title && (
        <Typography variant={'subtitle2'} color={Colors.text}>{title}</Typography>
      )}
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
      }}>
        {showAdd && (
          <Button
            variant={'text'}
            component={'label'}>
            Upload
            <input
              type={'file'}
              hidden={true}
              multiple={isMultiple}
              accept={'image/*'}
              onChange={_onSelectFile}
            />
          </Button>
        )}
        <ImageList
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
          }}
          cols={1}
          rowHeight={IMG_SIZE}>
          {data.map((item, index) => (
            <Box key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
              }}>
              <Image
                src={`${Helper.getBaseUrl()}${item}`}
                alt={`${Helper.getBaseUrl()}${item}`}
                width={IMG_SIZE}
                height={IMG_SIZE}
              />
              <IconButton
                color={'error'}
                edge={'end'}
                sx={{position: 'absolute'}}
                onClick={() => _onDeleteFile(item)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </ImageList>
        <Loader visible={loading} />
      </Box>
    </Box>
  );
}

package com.cl.entity.view;

import com.cl.entity.DiscussnongchanpinEntity;

import com.baomidou.mybatisplus.annotations.TableName;
import org.apache.commons.beanutils.BeanUtils;
import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;

import java.io.Serializable;
import com.cl.utils.EncryptUtil;
 

/**
 * 农产品评论表
 * 后端返回视图实体辅助类   
 * （通常后端关联的表或者自定义的字段需要返回使用）
 * @author 
 * @email 
 * @date 2024-03-19 21:20:19
 */
@TableName("discussnongchanpin")
public class DiscussnongchanpinView  extends DiscussnongchanpinEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	public DiscussnongchanpinView(){
	}
 
 	public DiscussnongchanpinView(DiscussnongchanpinEntity discussnongchanpinEntity){
 	try {
			BeanUtils.copyProperties(this, discussnongchanpinEntity);
		} catch (IllegalAccessException | InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
 		
	}


}

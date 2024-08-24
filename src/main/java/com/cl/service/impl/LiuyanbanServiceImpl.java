package com.cl.service.impl;

import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.List;

import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.cl.utils.PageUtils;
import com.cl.utils.Query;


import com.cl.dao.LiuyanbanDao;
import com.cl.entity.LiuyanbanEntity;
import com.cl.service.LiuyanbanService;
import com.cl.entity.view.LiuyanbanView;

@Service("liuyanbanService")
public class LiuyanbanServiceImpl extends ServiceImpl<LiuyanbanDao, LiuyanbanEntity> implements LiuyanbanService {
	
	
    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        Page<LiuyanbanEntity> page = this.selectPage(
                new Query<LiuyanbanEntity>(params).getPage(),
                new EntityWrapper<LiuyanbanEntity>()
        );
        return new PageUtils(page);
    }
    
    @Override
	public PageUtils queryPage(Map<String, Object> params, Wrapper<LiuyanbanEntity> wrapper) {
		  Page<LiuyanbanView> page =new Query<LiuyanbanView>(params).getPage();
	        page.setRecords(baseMapper.selectListView(page,wrapper));
	    	PageUtils pageUtil = new PageUtils(page);
	    	return pageUtil;
 	}
    
	@Override
	public List<LiuyanbanView> selectListView(Wrapper<LiuyanbanEntity> wrapper) {
		return baseMapper.selectListView(wrapper);
	}

	@Override
	public LiuyanbanView selectView(Wrapper<LiuyanbanEntity> wrapper) {
		return baseMapper.selectView(wrapper);
	}


}
